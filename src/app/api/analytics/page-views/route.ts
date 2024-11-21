import { Document } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { validateRequestIp } from '@/library/validateIp'

import { databaseNames, tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

interface PageView {
  timestamp: Date
}

interface PageViewData {
  page: string
  totalViews: number
  views: PageView[]
}

interface PageMetrics {
  page: string
  allTime: number
  last30Days: number
  thisMonth: number
}

const ignoredPages = ['/analytics']

export async function POST(request: NextRequest) {
  try {
    const ipValidation = validateRequestIp(request)
    if (!ipValidation.isValid) {
      return ipValidation.response
    }

    const body: { page: string } = await request.json()
    const { page } = body

    if (!page) {
      return NextResponse.json({ error: 'Page is required' }, { status: 400 })
    }

    if (ignoredPages.includes(page)) {
      return NextResponse.json({ message: 'Ignored analytics page view' })
    }

    const client = await mongoClient
    const db = client.db(databaseNames)
    const collection = db.collection<PageViewData>(tableNames.pageViews)

    await collection.updateOne(
      { page },
      {
        $inc: { totalViews: 1 },
        $push: {
          views: { $each: [{ timestamp: new Date() }] },
        },
      } as Document,
      { upsert: true },
    )

    return NextResponse.json({
      message: 'View counted successfully',
      page,
    })
  } catch (error) {
    console.error('Error counting page view:', error)
    return NextResponse.json({ error: 'Failed to count page view' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await mongoClient
    const db = client.db(databaseNames)
    const collection = db.collection<PageViewData>(tableNames.pageViews)

    const now = new Date()
    const ukTime = new Date(now.toLocaleString('en-GB', { timeZone: 'Europe/London' }))

    const thirtyDaysAgo = new Date(ukTime)
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const startOfMonth = new Date(ukTime.getFullYear(), ukTime.getMonth(), 1)

    const pages = await collection.find().toArray()

    const pageMetrics: PageMetrics[] = pages.map(page => {
      const last30DaysViews = page.views.filter(view => new Date(view.timestamp) >= thirtyDaysAgo).length

      const thisMonthViews = page.views.filter(view => new Date(view.timestamp) >= startOfMonth).length

      return {
        page: page.page,
        allTime: page.totalViews,
        last30Days: last30DaysViews,
        thisMonth: thisMonthViews,
      }
    })

    const siteTotals = {
      allTime: pageMetrics.reduce((sum, page) => sum + page.allTime, 0),
      last30Days: pageMetrics.reduce((sum, page) => sum + page.last30Days, 0),
      thisMonth: pageMetrics.reduce((sum, page) => sum + page.thisMonth, 0),
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
