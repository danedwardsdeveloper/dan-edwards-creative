import clsx from 'clsx'
import { ReactNode } from 'react'

import { Container } from '@/components/Container'

export function SimpleLayout({
  title,
  intro,
  articleContent = true,
  children,
}: {
  title: string
  intro: string | ReactNode
  articleContent?: boolean
  children?: React.ReactNode
}) {
  return (
    <Container>
      <header className="mx-auto max-w-2xl mt-12 px-4 md:px-0">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {title}
        </h1>
        <p className="mt-6 text-balance text-base text-zinc-600 dark:text-zinc-400">{intro}</p>
      </header>
      {children && (
        <div className={clsx('mt-16 sm:mt-20 px-4 md:px-0', articleContent && 'article-content')}>
          {children}
        </div>
      )}
    </Container>
  )
}
