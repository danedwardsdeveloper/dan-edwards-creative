import { Metadata } from 'next'

import { siteMetadata } from '@/library/metadata'

export const metadata: Metadata = {
  title: siteMetadata.workWithMe.title,
  description: siteMetadata.workWithMe.description,
  alternates: {
    canonical: siteMetadata.workWithMe.canonical,
  },
}

export default function WorkWithMeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
