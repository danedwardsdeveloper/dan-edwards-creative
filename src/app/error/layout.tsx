import { Metadata } from 'next'

import { siteMetadata } from '@/library/metadata'

export const metadata: Metadata = {
  title: siteMetadata.error.title,
  description: siteMetadata.error.description,
  alternates: {
    canonical: siteMetadata.error.canonical,
  },
}

export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
