'use client'

import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { Destination } from '@/library/database/models/linkClick'
import logger from '@/library/logger'
import { typesafeFetch } from '@/library/typesafeFetch'

export function useRecordLinkClick() {
  const currentPath = usePathname()

  const recordClick = useCallback(
    async (destination: Destination) => {
      logger.debug('Current path: ', currentPath)
      logger.debug('Destination: ', destination)

      try {
        const data = await typesafeFetch({
          path: '/api/analytics/link-clicks',
          method: 'POST',
          body: {
            destination,
            source: currentPath,
          },
        })

        switch (data.message) {
          case 'destination required':
            logger.info('Destination required')
            break
          case 'source required':
            logger.info('Source required')
            break
          case 'admin click failed':
            logger.error('Admin click failed to record')
            break
          case 'admin click recorded':
            logger.info('Admin click successfully recorded')
            break
          case 'click failed':
            logger.error('Click failed to record')
            break
          case 'click recorded':
            logger.info('Click recorded successfully')
            break
          default:
            logger.error('Unknown response from analytics endpoint')
            break
        }
      } catch (error) {
        logger.error('Error logging link click:', error)
      }
    },
    [currentPath],
  )

  return recordClick
}
