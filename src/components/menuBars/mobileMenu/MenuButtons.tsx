'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { baseStyles, colourStyles, mobileButtonStyles, sizeStyles } from '../styles'
import { useLayout } from '@/providers/layout'

export function MenuButton() {
  const { mobilePanelVisible, setMobilePanelVisible } = useLayout()
  const path = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (mobilePanelVisible) {
      previousFocusRef.current = document.activeElement as HTMLElement
    }
  }, [mobilePanelVisible])

  useEffect(() => {
    if (!mobilePanelVisible && previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [mobilePanelVisible])

  useEffect(() => {
    const handleClickOutside = (mouseEvent: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(mouseEvent.target as Node)) {
        setMobilePanelVisible(false)
      }
    }

    const handleEscapeKey = (escapeEvent: KeyboardEvent) => {
      if (escapeEvent.key === 'Escape') {
        setMobilePanelVisible(false)
      }
    }

    const handleTabKey = (keyboardEvent: KeyboardEvent) => {
      if (!mobilePanelVisible || !containerRef.current) return

      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const firstFocusable = focusableElements[0] as HTMLElement
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

      if (keyboardEvent.key === 'Tab') {
        if (keyboardEvent.shiftKey) {
          if (document.activeElement === firstFocusable) {
            keyboardEvent.preventDefault()
            lastFocusable.focus()
          }
        } else {
          if (document.activeElement === lastFocusable) {
            keyboardEvent.preventDefault()
            firstFocusable.focus()
          }
        }
      }
    }

    if (mobilePanelVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
      document.addEventListener('keydown', handleTabKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [mobilePanelVisible, setMobilePanelVisible])

  useEffect(() => {
    setMobilePanelVisible(false)
  }, [path, setMobilePanelVisible])

  const toggleMenu = () => {
    setMobilePanelVisible(!mobilePanelVisible)
  }
  return (
    <button
      onClick={toggleMenu}
      className={clsx(
        baseStyles,
        mobileButtonStyles,
        sizeStyles['base'],
        colourStyles.text['base'],
        mobilePanelVisible ? colourStyles.active : colourStyles.inactive,
      )}
    >{`Menu`}</button>
  )
}

export function HomeButton() {
  const currentPath = usePathname()
  const isActive = currentPath === `/`
  return (
    <Link
      href={`/`}
      className={clsx(
        baseStyles,
        mobileButtonStyles,
        sizeStyles['base'],
        colourStyles.text['base'],
        isActive ? colourStyles.active : colourStyles.inactive,
      )}
    >
      {`Home`}
    </Link>
  )
}
