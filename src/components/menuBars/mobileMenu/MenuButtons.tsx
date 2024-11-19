'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { baseStyles, colourStyles, mobileButtonStyles, sizeStyles } from '../styles'
import { useLayout } from '@/providers/layout'

export function MenuButton() {
  const { mobileMenuOpen, setMobileMenuOpen } = useLayout()
  const path = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (mobileMenuOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen && previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (mouseEvent: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(mouseEvent.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    const handleEscapeKey = (escapeEvent: KeyboardEvent) => {
      if (escapeEvent.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    const handleTabKey = (keyboardEvent: KeyboardEvent) => {
      if (!mobileMenuOpen || !containerRef.current) return

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

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
      document.addEventListener('keydown', handleTabKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [mobileMenuOpen, setMobileMenuOpen])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [path, setMobileMenuOpen])

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  return (
    <button
      onClick={toggleMenu}
      className={clsx(
        baseStyles,
        mobileButtonStyles,
        sizeStyles['base'],
        colourStyles.text['base'],
        mobileMenuOpen ? colourStyles.active : colourStyles.inactive,
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
