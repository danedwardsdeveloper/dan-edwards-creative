'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { MoonIcon, SunIcon } from './Icons'

interface MenuItem {
  name: string
  target: string
}

export const menuItems: MenuItem[] = [
  {
    name: 'Home',
    target: '/',
  },
  {
    name: 'Links',
    target: '/links',
  },
]

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const isActive = usePathname() === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block',
          'px-3 py-2',
          'transition duration-200',
          isActive
            ? ['text-blue-600 dark:text-blue-400', 'cursor-default']
            : [
                'hover:text-blue-600 dark:hover:text-blue-400',
                'cursor-pointer',
              ],
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0" />
        )}
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <div className="flex items-center rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <ul className="flex">
          {menuItems.map((menuItem) => (
            <NavItem href={menuItem.target} key={menuItem.name}>
              {menuItem.name}
            </NavItem>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className={clsx(
        'group rounded-full bg-white/90 px-3 py-2',
        'backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
      )}
      onClick={() => setTheme(otherTheme)}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-blue-50 [@media(prefers-color-scheme:dark)]:stroke-blue-400 [@media(prefers-color-scheme:dark)]:group-hover:fill-blue-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-blue-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-blue-500" />
    </button>
  )
}

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

export default function MenuBar() {
  const isHomePage = usePathname() === '/'

  const headerRef = useRef<React.ElementRef<'div'>>(null)
  const avatarRef = useRef<React.ElementRef<'div'>>(null)
  const isInitial = useRef(true)

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateStyles() {
      updateHeaderStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <header
      className="pointer-events-none relative z-50 flex flex-none flex-col"
      style={{
        height: 'var(--header-height)',
        marginBottom: 'var(--header-mb)',
      }}
    >
      {isHomePage && (
        <>
          <div
            ref={avatarRef}
            className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
          />
          <Container
            className="top-0 order-last -mb-3 pt-3"
            style={{
              position:
                'var(--header-position)' as React.CSSProperties['position'],
            }}
          >
            <div
              className="top-[var(--avatar-top,theme(spacing.3))] w-full"
              style={{
                position:
                  'var(--header-inner-position)' as React.CSSProperties['position'],
              }}
            >
              <div className="relative"></div>
            </div>
          </Container>
        </>
      )}
      <div
        ref={headerRef}
        className="top-0 z-10 h-16 pt-6"
        style={{
          position: 'var(--header-position)' as React.CSSProperties['position'],
        }}
      >
        <Container
          className="top-[var(--header-top,theme(spacing.6))] w-full"
          style={{
            position:
              'var(--header-inner-position)' as React.CSSProperties['position'],
          }}
        >
          <div className="relative flex flex-1 justify-center">
            <DesktopNavigation className="pointer-events-auto" />
          </div>
        </Container>
      </div>
    </header>
  )
}
