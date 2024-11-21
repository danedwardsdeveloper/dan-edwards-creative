import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

interface StyledLinkProps {
  href: string
  ariaLabel?: string
  children: ReactNode
  classes?: string
}

export default function StyledLink({ href, ariaLabel, children, classes }: StyledLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('//')

  const targetRelationProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={clsx(
        'text-slate-600 hover:text-slate-400',
        'dark:text-slate-500 dark:hover:text-slate-700',
        'transition-all duration-200',
        'underline underline-offset-2 decoration-slate-300 dark:decoration-slate-600',
        classes,
      )}
      {...targetRelationProps}
    >
      {children}
    </Link>
  )
}
