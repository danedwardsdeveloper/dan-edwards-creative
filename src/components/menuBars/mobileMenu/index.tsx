'use client'

import clsx from 'clsx'

import { ThemeToggleIcons } from '../ThemeToggle'
import { HomeButton, MenuButton } from './MenuButtons'
import MobileMenuItems from './MobileMenuItems'
import { useLayout } from '@/providers/layout'

export default function MobileMenu() {
  const { mobilePanelVisible } = useLayout()

  return (
    <header
      data-component="MobileMenu"
      className={clsx(
        'md:hidden',
        'transition-all duration-500 transform-gpu',
        'bg-white dark:bg-zinc-900',
        'border-b border-zinc-200 dark:border-zinc-700',
        'h-10',
      )}
      role="banner"
      aria-label="Mobile navigation menu"
    >
      <div
        data-component="MobileMenuHeader"
        className={clsx('flex justify-between w-full h-full items-center px-4')}
      >
        <HomeButton />
        <ThemeToggleIcons />
        <MenuButton />
      </div>
      <div
        data-component="MobileMenuPanel"
        className={clsx(
          'absolute z-40 w-full top-10',
          'bg-zinc-50 dark:bg-black',
          'border-zinc-200 dark:border-zinc-700',
          'transition-all duration-700 ease-in-out overflow-hidden',
          'after:absolute after:bottom-0 after:left-0 after:right-0',
          'after:bg-slate-300 after:transition-all after:duration-500',
          mobilePanelVisible ? 'h-40 border-b' : 'h-0 border-none',
        )}
      >
        <div className="flex flex-col justify-start w-full">
          <nav aria-label="Site Navigation" role="navigation">
            <ul className="pt-4 pl-4 space-y-6">
              <MobileMenuItems />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
