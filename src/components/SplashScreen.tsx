'use client'

import { clsx } from 'clsx'
import Image from 'next/image'
import { useEffect } from 'react'

import Spinner from './Spinner'
import iconPNG from '@/app/icon.png'
import { useLoading } from '@/hooks/useLoading'

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading()
  const forceShow = false
  const showSplash = isLoading || forceShow

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [showSplash])

  return (
    <>
      {showSplash && (
        <div
          data-component="SplashScreen"
          className={clsx(
            'fixed inset-0',
            'z-50',
            'flex flex-col items-center justify-center',
            'bg-slate-50 dark:bg-gray-900',
            'transition-opacity duration-300',
            {
              'opacity-100': isLoading,
              'opacity-0 pointer-events-none': !isLoading,
            },
          )}
        >
          <Image src={iconPNG} alt="Dan Edwards creative icon" height={80} width={80} />

          <div className="absolute bottom-20">
            <Spinner />
          </div>
          <h1
            className={clsx('absolute bottom-8', 'text-xl font-medium', 'text-gray-900 dark:text-gray-100')}
          >
            Dan Edwards creative
          </h1>
        </div>
      )}
      <div className={isLoading ? 'hidden' : ''}>{children}</div>
    </>
  )
}
