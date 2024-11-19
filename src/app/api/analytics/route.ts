import { NextResponse } from 'next/server'

import clientPromise from '@/library/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('page-views')
    const collection = db.collection('dan-edwards-creative')

    const now = new Date()
    const ukTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' }))

    const thirtyDaysAgo = new Date(ukTime)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const startOfMonth = new Date(ukTime.getFullYear(), ukTime.getMonth(), 1)

    const pages = await collection.find({}).toArray()

    const pageMetrics = pages.map(page => {
      const last30DaysViews = page.views.filter(
        (view: { timestamp: Date }) => new Date(view.timestamp) >= thirtyDaysAgo,
      ).length

      const thisMonthViews = page.views.filter(
        (view: { timestamp: Date }) => new Date(view.timestamp) >= startOfMonth,
      ).length

      return {
        page: page.page,
        allTime: page.totalViews,
        last30Days: last30DaysViews,
        thisMonth: thisMonthViews,
      }
    })

    const siteTotals = {
      allTime: pages.reduce((sum, page) => sum + page.totalViews, 0),
      last30Days: pages.reduce(
        (sum, page) =>
          sum +
          page.views.filter((view: { timestamp: Date }) => new Date(view.timestamp) >= thirtyDaysAgo).length,
        0,
      ),
      thisMonth: pages.reduce(
        (sum, page) =>
          sum +
          page.views.filter((view: { timestamp: Date }) => new Date(view.timestamp) >= startOfMonth).length,
        0,
      ),
    }

    const sortedPages = {
      allTime: [...pageMetrics].sort((a, b) => b.allTime - a.allTime),
      last30Days: [...pageMetrics].sort((a, b) => b.last30Days - a.last30Days),
      thisMonth: [...pageMetrics].sort((a, b) => b.thisMonth - a.thisMonth),
    }

    return NextResponse.json({
      siteTotals,
      pageMetrics: sortedPages,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
