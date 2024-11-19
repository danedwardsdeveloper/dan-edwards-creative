import { ElementRef, useEffect, useRef, useState } from 'react'

import DesktopMenu from './desktopMenu'
import MobileMenuLayout from './mobileMenu/layout'

export default function MenuBars() {
  const headerRef = useRef<ElementRef<'div'>>(null)
  const desktopHeaderRef = useRef<ElementRef<'div'>>(null)
  const lastScrollTop = useRef(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto') as HTMLElement
    if (!scrollContainer) return

    function updateHeaderStyles() {
      if (!headerRef.current || !desktopHeaderRef.current) return

      const scrollTop = scrollContainer.scrollTop
      const { height } = headerRef.current.getBoundingClientRect()

      if (scrollTop > lastScrollTop.current && scrollTop > height) {
        headerRef.current.style.transform = 'translateY(-100%)'
        desktopHeaderRef.current.style.transform = 'translateY(-100%)'
        setIsVisible(false)
      } else if (scrollTop < lastScrollTop.current) {
        headerRef.current.style.transform = 'translateY(0)'
        desktopHeaderRef.current.style.transform = 'translateY(0)'
        setIsVisible(true)
      }

      lastScrollTop.current = scrollTop
    }

    const handleScroll = () => requestAnimationFrame(updateHeaderStyles)
    const handleResize = () => requestAnimationFrame(updateHeaderStyles)

    updateHeaderStyles()
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="fixed md:hidden top-0 left-0 right-0 z-50 w-full transition-transform duration-500"
        aria-hidden={!isVisible}
        role="navigation"
      >
        <MobileMenuLayout />
      </header>
      <header
        ref={desktopHeaderRef}
        className="hidden md:block fixed pt-6 left-0 right-0 z-50 w-full transition-transform duration-500"
        aria-hidden={!isVisible}
        role="navigation"
      >
        <DesktopMenu />
      </header>
    </>
  )
}
