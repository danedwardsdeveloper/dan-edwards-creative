import clsx from 'clsx'

import Divider from '@/components/Divider'

import { ThemeToggleButtons } from '../ThemeToggle'
import SiteLinks from './Links'
import { HomeButton, MenuButton } from './MenuButtons'
import { useLayout } from '@/providers/layout'

export default function MobileMenuLayout() {
  const { mobileMenuOpen } = useLayout()

  return (
    <div
      className={clsx(
        'pointer-events-auto',
        'w-full flex flex-col',
        'justify-end items-center',
        'border-b border-blue-200 dark:border-slate-900',
        'bg-gradient-to-r from-sky-50 via-indigo-100 to-cyan-100',
        ' dark:from-sky-950 dark:via-indigo-950 dark:to-cyan-950',
        'px-4',
      )}
    >
      <div className="flex justify-between w-full my-5">
        <HomeButton />
        <MenuButton />
      </div>
      <div
        className={clsx(
          'w-full overflow-hidden transition-all duration-700 ease-in-out',
          mobileMenuOpen ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <div className="pb-4 flex flex-col justify-start w-full">
          <Divider margin="mt-0 mb-4" />
          <nav className="space-y-4" aria-label="Site Navigation" role="navigation">
            <SiteLinks gap="gap-y-4" />
          </nav>
          <Divider margin="mt-0 mb-4" />
          <ThemeToggleButtons />
        </div>
      </div>
    </div>
  )
}
