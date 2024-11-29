'use client'

import clsx from 'clsx'

import { menuItems } from '../data'
import { ThemeToggleIcons } from '../ThemeToggle'
import NavItem from './desktopMenuItems'

export default function DesktopMenu() {
  return (
    <div
      data-component="DesktopMenu"
      className={clsx(
        'h-16 pt-6',
        'block fixed',
        'pt-6 left-0 right-0 z-40 top-0 w-full transition-transform duration-500',
      )}
    >
      <div className="flex justify-center">
        <nav className="flex  items-center rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 pointer-events-auto">
          <ul className="flex">
            {menuItems.map(menuItem => (
              <NavItem href={menuItem.href} key={menuItem.href}>
                {menuItem.displayName}
              </NavItem>
            ))}
          </ul>
          <ThemeToggleIcons />
        </nav>
      </div>
    </div>
  )
}
