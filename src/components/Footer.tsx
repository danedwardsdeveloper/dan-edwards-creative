'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { useRecordLinkClick } from '@/hooks/useRecordLinkClick'

const footerLinkStyles = clsx(
  'text-sm',
  'text-zinc-500 dark:text-zinc-400',
  'decoration-transparent dark:decoration-zinc-400',
  'underline-offset-2',
  'hover:underline hover:decoration-zinc-500',
  'transition-all duration-300',
)

export function Footer() {
  const recordClick = useRecordLinkClick()

  return (
    <footer
      data-component="Footer"
      className={clsx(
        'shrink-0',
        'flex flex-col sm:flex-row',
        'mt-32 py-6 pb-8 md:px-6 gap-6',
        'border-t border-zinc-100 dark:border-zinc-700/40',
        'items-center justify-end',
      )}
    >
      <Link
        href="/privacy-policy-and-terms-of-service"
        className={footerLinkStyles}
      >{`Privacy policy & terms of service`}</Link>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {`Site by `}
        <Link
          href="https://danedwardsdeveloper.com/"
          className={footerLinkStyles}
          onClick={() => recordClick('developer-site')}
        >{`Dan Edwards`}</Link>
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">© {new Date().getFullYear()}, Dan Edwards</p>
    </footer>
  )
}
