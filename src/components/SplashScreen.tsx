'use client'

import { clsx } from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { cloudfrontDomain } from '@/library/environment'

import Spinner from './Spinner'
import { useLoading } from '@/hooks/useLoading'

export default function SplashScreen() {
  const [splashExists, setSplashExists] = useState(true)
  const { isLoading } = useLoading()

  const forceShow = false

  const showSplash = forceShow || isLoading

  useEffect(() => {
    if (showSplash) {
      setSplashExists(true)
    } else {
      const timer = setTimeout(() => {
        setSplashExists(false)
      }, 550)
      return () => clearTimeout(timer)
    }
  }, [showSplash])

  if (!splashExists) return null

  return (
    <div
      data-component="SplashScreen"
      className={clsx(
        'flex flex-col fixed h-full inset-0',
        'z-50',
        'flex flex-col items-center justify-center',
        'bg-slate-50 dark:bg-gray-900',
        'transition-opacity duration-500',
        showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <Spinner />
      <div className="absolute bottom-20">
        <Image
          src={`${cloudfrontDomain}/dan-edwards-creative-icon-160.webp`}
          alt="Dan Edwards creative icon"
          height={80}
          width={80}
        />
      </div>
      <h1 className={clsx('absolute bottom-8', 'text-xl font-medium', 'text-gray-900 dark:text-gray-100')}>
        Dan Edwards creative
      </h1>
    </div>
  )
}
