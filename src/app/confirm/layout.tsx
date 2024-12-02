import { Metadata } from 'next'

import { siteMetadata } from '@/library/metadata'

export const metadata: Metadata = {
  title: siteMetadata.confirm.title,
  description: siteMetadata.confirm.description,
  alternates: {
    canonical: siteMetadata.confirm.canonical,
  },
}

export default function ConfirmPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
