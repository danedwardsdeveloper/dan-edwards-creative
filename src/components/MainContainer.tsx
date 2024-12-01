'use client'

import clsx from 'clsx'
import { ReactNode } from 'react'

import { Footer } from './Footer'

export default function MainContainer({ children }: { children: ReactNode }) {
  return (
    <main data-component="MainContainer" className="flex-1 overflow-y-auto w-full">
      <div
        className={clsx(
          'min-h-full',
          'flex flex-col',
          'md:mx-8 lg:mx-16',
          'bg-white dark:bg-zinc-900',
          'md:border-x border-zinc-100 dark:border-zinc-300/20 ',
        )}
      >
        <div className={clsx('md:mt-32', 'flex-1 max-w-5xl mx-auto w-full', 'px-4 sm:px-8 lg:px-0')}>
          {children}
        </div>
        <div data-component="FooterContainer">
          <Footer />
        </div>
      </div>
    </main>
  )
}
