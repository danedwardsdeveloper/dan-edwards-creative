'use client'
import { SimpleLayout } from '@/components/SimpleLayout'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface PageMetric {
  page: string
  allTime: number
  last30Days: number
  thisMonth: number
}

interface Analytics {
  siteTotals: {
    allTime: number
    last30Days: number
    thisMonth: number
  }
  pageMetrics: {
    allTime: PageMetric[]
    last30Days: PageMetric[]
    thisMonth: PageMetric[]
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load analytics:', err)
        setError('Failed to load analytics')
        setLoading(false)
      })
  }, [])

  const formatPage = (page: string) => {
    return page === '/' ? 'Home page' : page
  }

  const currentMonth = new Date().toLocaleString('en-GB', { month: 'long' })

  const sectionStyles = clsx(
    'space-y-4',
    'border-b',
    'border-gray-200 dark:border-gray-600',
    'pb-20 mb-6',
  )

  return (
    <SimpleLayout
      title={'Analytics'}
      intro={'Page views for Dan Edwards Creative'}
    >
      <div className="mx-auto max-w-md space-y-8 dark:text-slate-300">
        {loading && <div>Loading analytics...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && !analytics && <div>No data available</div>}

        {analytics && (
          <>
            <section className={sectionStyles}>
              <h2 className="text-xl font-semibold">All-time</h2>
              <div className="flex justify-between">
                <span>Site total</span>
                <span>{analytics.siteTotals.allTime.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                {analytics.pageMetrics.allTime.map((metric) => (
                  <div key={metric.page} className="flex justify-between">
                    <span>{formatPage(metric.page)}</span>
                    <span>{metric.allTime.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionStyles}>
              <h2 className="text-xl font-semibold">Last 30 days</h2>
              <div className="flex justify-between">
                <span>Site total</span>
                <span>{analytics.siteTotals.last30Days.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                {analytics.pageMetrics.last30Days.map((metric) => (
                  <div key={metric.page} className="flex justify-between">
                    <span>{formatPage(metric.page)}</span>
                    <span>{metric.last30Days.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={sectionStyles}>
              <h2 className="text-xl font-semibold">{currentMonth}</h2>
              <div className="flex justify-between">
                <span>Site total</span>
                <span>{analytics.siteTotals.thisMonth.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                {analytics.pageMetrics.thisMonth.map((metric) => (
                  <div key={metric.page} className="flex justify-between">
                    <span>{formatPage(metric.page)}</span>
                    <span>{metric.thisMonth.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </SimpleLayout>
  )
}
