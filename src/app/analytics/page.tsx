'use client'
import { useContext, useMemo } from 'react'
import { useEffect, useState } from 'react'
import { AppContext } from '../providers'
import { Container } from '@/components/Container'
import HoveringBackButton from '@/components/HoveringBackButton'
import { Header } from '@/components/Header'

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

interface FormattedMetrics {
  allTime: { page: string; value: string }[]
  last30Days: { page: string; value: string }[]
  thisMonth: { page: string; value: string }[]
}

interface AnalyticsSectionProps {
  title: string
  siteTotal: string
  metrics: { page: string; value: string }[]
}

const AnalyticsSection = ({
  title,
  siteTotal,
  metrics,
}: AnalyticsSectionProps) => {
  return (
    <section className="mb-6 space-y-4 py-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex justify-between">
        <span className="mb-2 font-semibold">Site total</span>
        <span className="mb-2 font-semibold">{siteTotal}</span>
      </div>
      <div className="space-y-2">
        {metrics.map(({ page, value }) => (
          <div key={page} className="flex justify-between">
            <span>{page}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function AnalyticsPage() {
  const { previousPathname } = useContext(AppContext)
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/analytics/page-views')
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

  const formatPage = useMemo(() => {
    return (page: string) => (page === '/' ? 'Home page' : page)
  }, [])

  const currentMonth = useMemo(() => {
    return new Date().toLocaleString('en-GB', { month: 'long' })
  }, [])

  const formattedSiteTotals = useMemo(() => {
    if (!analytics) return null

    return {
      allTime: analytics.siteTotals.allTime.toLocaleString(),
      last30Days: analytics.siteTotals.last30Days.toLocaleString(),
      thisMonth: analytics.siteTotals.thisMonth.toLocaleString(),
    }
  }, [analytics])

  const formattedMetrics = useMemo<FormattedMetrics | null>(() => {
    if (!analytics) return null

    const formatMetrics = (
      metrics: PageMetric[],
      valueKey: keyof PageMetric,
    ) => {
      return metrics.map((metric) => ({
        page: formatPage(metric.page),
        value: metric[valueKey].toLocaleString(),
      }))
    }

    return {
      allTime: formatMetrics(analytics.pageMetrics.allTime, 'allTime'),
      last30Days: formatMetrics(analytics.pageMetrics.last30Days, 'last30Days'),
      thisMonth: formatMetrics(analytics.pageMetrics.thisMonth, 'thisMonth'),
    }
  }, [analytics, formatPage])

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <HoveringBackButton previousPathname={previousPathname} />
            <Header
              title="Analytics"
              subtitle="Site analytics for Dan Edwards creative"
            />
            <div className="mt-16 max-w-md">
              {loading && <div>Loading analytics...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {!loading && !error && !analytics && <div>No data available</div>}

              {formattedMetrics && formattedSiteTotals && (
                <div className="divide-y divide-gray-200 dark:divide-gray-600">
                  <AnalyticsSection
                    title="All-time"
                    siteTotal={formattedSiteTotals.allTime}
                    metrics={formattedMetrics.allTime}
                  />

                  <AnalyticsSection
                    title="Last 30 days"
                    siteTotal={formattedSiteTotals.last30Days}
                    metrics={formattedMetrics.last30Days}
                  />

                  <AnalyticsSection
                    title={currentMonth}
                    siteTotal={formattedSiteTotals.thisMonth}
                    metrics={formattedMetrics.thisMonth}
                  />
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
}
