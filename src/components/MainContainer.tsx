'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'

import { Footer } from './Footer'

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <main data-component="MainContainer" className="flex-1 overflow-y-auto w-full">
      <div className="min-h-full flex flex-col lg:mx-16 bg-white">
        <div
          className={clsx(
            'md:mt-16', // Offset DesktopMenu. MobileMenu is part of the flex container while DesktopMenu is position:absolute
            'flex-1 max-w-4xl mx-auto px-6',
          )}
        >
          {children}
        </div>
        <div data-component="FooterContainer">
          <Footer />
        </div>
      </div>
    </main>
  )
}
