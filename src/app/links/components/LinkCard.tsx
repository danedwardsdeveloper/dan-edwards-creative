import { FC } from 'react'

import Link from 'next/link'

import { IconProps } from '@/components/Icons'

export interface LinkItemInterface {
  title: string
  href: string
  icon: FC<IconProps>
  description: string
  external?: boolean
}

interface LinkCardProps {
  linkCard: LinkItemInterface
}

export default function LinkCard({ linkCard }: LinkCardProps) {
  const { title, href, icon: Icon, description } = linkCard
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center rounded-lg bg-blue-50 p-3 transition-colors duration-300 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700"
      aria-label={`${title} - ${description}`}
    >
      <Icon
        className="h-10 w-10 flex-shrink-0 stroke-zinc-500 transition-colors duration-300 group-hover:stroke-zinc-700 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-300"
        aria-hidden="true"
      />
      <div className="ml-4 flex min-w-0 flex-col">
        <span className="text-balance text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </span>
        <span className="line-clamp-2 text-balance text-sm text-zinc-600 dark:text-zinc-300">
          {description}
        </span>
      </div>
    </Link>
  )
}
