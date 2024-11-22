import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

interface StyledLinkProps {
  href: string
  text?: string
  colour?: 'default' | 'red' | 'green' | 'blue'
  ariaLabel?: string
  children?: ReactNode
  classes?: string
}

export default function StyledLink({
  href,
  text,
  colour = 'default',
  ariaLabel,
  children,
  classes,
}: StyledLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('//')

  const targetRelationProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const colourStyles = {
    default: {
      text: 'text-slate-600 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300',
      decoration:
        'decoration-slate-400 hover:decoration-slate-300 dark:decoration-slate-600 dark:hover:decoration-slate-500',
    },
    red: {
      text: 'text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300',
      decoration:
        'decoration-red-400 hover:decoration-red-300 dark:decoration-red-600 dark:hover:decoration-red-500',
    },
    green: {
      text: 'text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300',
      decoration:
        'decoration-green-400 hover:decoration-green-300 dark:decoration-green-600 dark:hover:decoration-green-500',
    },
    blue: {
      text: 'text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300',
      decoration:
        'decoration-blue-400 hover:decoration-blue-300 dark:decoration-blue-600 dark:hover:decoration-blue-500',
    },
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={clsx(
        colourStyles[colour].text,
        colourStyles[colour].decoration,
        'transition-all duration-200',
        'underline underline-offset-2',
        classes,
      )}
      {...targetRelationProps}
    >
      {text || children}
    </Link>
  )
}
