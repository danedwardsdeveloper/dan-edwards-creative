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
      <header className="max-w-2xl mt-12">
        <h1 className="text-balance text-5xl font-bold tracking-tight text-zinc-800  dark:text-zinc-100">
          {title}
        </h1>
        <p className="mt-6 text-balance text-base text-zinc-600 dark:text-zinc-400">{intro}</p>
      </header>
      {children && (
        <div className={clsx('my-12 sm:my-20', articleContent && 'article-content')}>{children}</div>
      )}
    </Container>
  )
}
