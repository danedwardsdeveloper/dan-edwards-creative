'use client'

import clsx from 'clsx'
import { after } from 'node:test'

// import { ElementRef, useEffect, useRef } from 'react'
import Divider from '@/components/Divider'

import { ThemeToggleButtons } from '../ThemeToggle'
import SiteLinks from './Links'
import { HomeButton, MenuButton } from './MenuButtons'
import { useLayout } from '@/providers/layout'

// import { useLayout } from '@/providers/layout'

export default function MobileMenu() {
  // const ref = useRef<ElementRef<'div'>>(null)
  // const lastScrollTop = useRef(0)
  const { setMenusVisible, mobilePanelVisible, menusVisible } = useLayout()

  // useEffect(() => {
  //   const scrollContainer = document.querySelector('[data-component="MainContainer"]') as HTMLElement

  //   if (!scrollContainer) return

  //   function updateHeaderStyles() {
  //     if (mobilePanelVisible) {
  //       setMenusVisible(true)
  //       return
  //     }

  //     const scrollTop = scrollContainer.scrollTop
  //     const isAtBottom = scrollContainer.scrollHeight - scrollContainer.clientHeight <= scrollTop + 10

  //     if (!isAtBottom) {
  //       if (scrollTop > lastScrollTop.current) {
  //         setMenusVisible(false)
  //       } else {
  //         setMenusVisible(true)
  //       }
  //     }

  //     lastScrollTop.current = scrollTop
  //   }

  //   const handleScroll = () => requestAnimationFrame(updateHeaderStyles)

  //   scrollContainer.addEventListener('scroll', handleScroll, {
  //     passive: true,
  //   })
  //   return () => scrollContainer.removeEventListener('scroll', handleScroll)
  // }, [mobilePanelVisible, setMenusVisible])

  return (
    <header
      // ref={ref}
      data-component="MobileMenu"
      className={clsx(
        'md:hidden',
        'relative overflow-hidden',
        'transition-all duration-500 transform-gpu',
        'after:absolute after:bottom-0 after:left-0 after:right-0',
        'after:bg-slate-300 after:transition-all after:duration-500',
        // menusVisible
        // ? mobilePanelVisible
        // ? 'h-[405px] after:bottom-0 after:h-[2px]'
        // : 'h-[87px] after:bottom-0 after:h-[2px]'
        // : 'h-0 after:h-0',
        mobilePanelVisible
          ? 'h-[405px] after:bottom-0 after:h-[2px]'
          : 'h-[87px] after:bottom-0 after:h-[2px]',
      )}
      role="banner"
      aria-label="Mobile navigation menu"
    >
      <div
        data-component="MobileMenuHeader"
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
          data-component="MobileMenuPanel"
          className={clsx(
            'absolute z-40 w-full top-20',
            'border-t border-blue-200 dark:border-slate-900',
            'bg-gradient-to-r from-sky-50 via-indigo-100 to-cyan-100',
            ' dark:from-sky-950 dark:via-indigo-950 dark:to-cyan-950',
            'transition-all duration-700 ease-in-out overflow-hidden',
            'after:absolute after:bottom-0 after:left-0 after:right-0',
            'after:bg-slate-300 after:transition-all after:duration-500',
            mobilePanelVisible ? 'h-[340px]' : 'h-0',
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
    </header>
  )
}
