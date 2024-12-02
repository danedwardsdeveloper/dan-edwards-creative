import { Metadata } from 'next'

import { siteMetadata } from '@/library/metadata'

export const metadata: Metadata = {
  title: siteMetadata.contact.title,
  description: siteMetadata.contact.description,
  alternates: {
    canonical: siteMetadata.contact.canonical,
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
