import { Metadata } from 'next'

import { siteMetadata } from '@/library/metadata'

export const metadata: Metadata = {
  title: siteMetadata.unsubscribe.title,
  description: siteMetadata.unsubscribe.description,
  alternates: {
    canonical: siteMetadata.unsubscribe.canonical,
  },
}

export default function UnsubscribePageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
