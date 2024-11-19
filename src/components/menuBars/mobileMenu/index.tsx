'use client'

import { ElementRef, useEffect, useRef, useState } from 'react'

import MobileMenuLayout from './layout'

export default function MobileMenu() {
  const headerRef = useRef<ElementRef<'div'>>(null)
  const lastScrollTop = useRef(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto') as HTMLElement
    if (!scrollContainer) return

    function updateHeaderStyles() {
      if (!headerRef.current) return

      const isMobileView = window.innerWidth < 768 // Tailwind md breakpoint

      if (!isMobileView) {
        headerRef.current.style.transform = ''
        setIsVisible(true)
        return
      }

      const scrollTop = scrollContainer.scrollTop
      const { height } = headerRef.current.getBoundingClientRect()

      if (scrollTop > lastScrollTop.current && scrollTop > height) {
        headerRef.current.style.transform = 'translateY(-100%)'
        setIsVisible(false)
      } else if (scrollTop < lastScrollTop.current) {
        headerRef.current.style.transform = 'translateY(0)'
        setIsVisible(true)
      }

      lastScrollTop.current = scrollTop
    }

    const handleScroll = () => {
      requestAnimationFrame(updateHeaderStyles)
    }

    const handleResize = () => {
      requestAnimationFrame(updateHeaderStyles)
    }

    updateHeaderStyles()
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className="fixed md:hidden top-0 left-0 right-0 z-50 w-full transition-transform duration-500"
      aria-hidden={!isVisible}
      role="banner"
      aria-label="Mobile navigation menu"
    >
      <MobileMenuLayout />
    </header>
  )
}
