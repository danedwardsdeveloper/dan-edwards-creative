import { type Metadata, type Viewport } from 'next'

import { productionBaseURL } from '@/library/environment'
import {
  defaultKeywords,
  defaultMetaDescription,
  defaultMetaTitle,
  defaultSocialImage,
  siteName,
} from '@/library/metadata'

import AudioPlayerContainer from '@/components/audioPlayerContainer'
import MainContainer from '@/components/MainContainer'
import DesktopMenu from '@/components/menuBars/desktopMenu'
import MobileMenu from '@/components/menuBars/mobileMenu'
import { PageViewTracker } from '@/components/PageViewTracker'
import { Providers } from '@/components/Providers'
import SplashScreen from '@/components/SplashScreen'

import '@/styles.tailwind.css'

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

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="antialiased" suppressHydrationWarning>
      <body className="h-[100dvh] flex flex-col overflow-hidden bg-zinc-50 dark:bg-black">
        <PageViewTracker />
        <Providers>
          <SplashScreen />
          <DesktopMenu />
          <MobileMenu />
          <MainContainer>{children}</MainContainer>
          <AudioPlayerContainer />
        </Providers>
      </body>
    </html>
  )
}
