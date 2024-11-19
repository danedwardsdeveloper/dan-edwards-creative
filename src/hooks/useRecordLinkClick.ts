'use client'

import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { Destination } from '@/app/api/analytics/link-clicks/route'

export function useRecordLinkClick() {
  const currentPath = usePathname()

  const recordClick = useCallback(
    async (destination: Destination) => {
      try {
        await fetch('/api/analytics/link-clicks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destination,
            source: currentPath,
          }),
        })
      } catch (error) {
        console.error('Error logging link click:', error)
      }
    },
    [currentPath],
  )

  return recordClick
}
