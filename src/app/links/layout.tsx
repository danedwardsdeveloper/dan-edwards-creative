import { Metadata } from 'next'

import { siteMetadata } from '@/library/metadata'

export const metadata: Metadata = {
  title: siteMetadata.links.title,
  description: siteMetadata.links.description,
  alternates: {
    canonical: siteMetadata.links.canonical,
  },
}

export default function LinksPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
