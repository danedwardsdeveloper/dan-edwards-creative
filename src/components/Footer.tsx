'use client'

import clsx from 'clsx'
import Link from 'next/link'

export function Footer() {
  return (
    <footer
      className={clsx(
        'flex flex-col sm:flex-row',
        'mt-4 py-6 pb-8 md:px-6 gap-6',
        'border-t border-zinc-100 dark:border-zinc-700/40',
        'items-center justify-end',
      )}
    >
      <Link
        href="/privacy-policy-and-terms-of-service"
        className={clsx(
          'text-sm',
          'text-zinc-500 dark:text-zinc-400',
          'decoration-transparent dark:decoration-zinc-400',
          'underline-offset-2',
          'hover:underline hover:decoration-zinc-500',
          'transition-all duration-300',
        )}
      >{`Privacy policy & terms of service`}</Link>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">© {new Date().getFullYear()}, Dan Edwards</p>
    </footer>
  )
}
