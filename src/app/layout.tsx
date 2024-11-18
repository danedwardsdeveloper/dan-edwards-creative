import { type Metadata } from 'next'

import { Providers } from '@/components/Providers'
import { PageViewTracker } from '@/components/PageViewTracker'
import { productionBaseURL } from '@/library/environment'
import {
  defaultKeywords,
  defaultMetaDescription,
  defaultMetaTitle,
  defaultSocialImage,
  siteName,
} from '@/library/metadata'
import '@/styles.tailwind.css'
import clsx from 'clsx'
import { AudioPlayer } from '@/components/player/AudioPlayer'
import { Footer } from '@/components/Footer'
import MenuBar from '@/components/MenuBar'

export const metadata: Metadata = {
  title: defaultMetaTitle,
  description: defaultMetaDescription,
  keywords: defaultKeywords,
  authors: [{ name: 'Dan Edwards', url: productionBaseURL }],
  creator: 'Dan Edwards',
  publisher: siteName,
  openGraph: {
    title: defaultMetaTitle,
    description: defaultMetaDescription,
    url: productionBaseURL,
    siteName: siteName,
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: defaultSocialImage.absoluteUrl,
        width: defaultSocialImage.width,
        height: defaultSocialImage.height,
        alt: defaultSocialImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: defaultSocialImage.absoluteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: productionBaseURL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <PageViewTracker />
        <Providers>
          <div className="flex w-full flex-col">
            <div className="h-[calc(100vh-6rem)]">
              <div className="fixed inset-0 flex justify-center sm:px-8">
                <div className="flex w-full max-w-7xl lg:px-8">
                  <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
                </div>
              </div>
              <div className="relative flex w-full flex-col">
                <MenuBar />
                <main className="flex-auto">{children}</main>
                <Footer />
              </div>
            </div>
            <div
              className={clsx(
                'fixed inset-x-0 bottom-0 z-10',
                'md:mx-auto md:max-w-xl',
              )}
            >
              <AudioPlayer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
