'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import { type ArticleWithSlug } from '@/library/articles'
import { ChevronRightIcon } from '@/components/Icons'

interface ArticlePreviewProps {
  article: ArticleWithSlug
  priority: boolean
}

export default function ArticlePreview({
  article,
  priority,
}: ArticlePreviewProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/articles/${article.slug}`)
  }

  return (
    <div
      key={article.slug}
      onClick={handleClick}
      className={clsx(
        'group relative mb-8 h-min rounded-3xl p-4',
        'max-w-2xl',
        'cursor-pointer',
        'transition-all duration-200 ease-in-out',
        'flex flex-col sm:flex-row',
        'gap-x-5',

        // Gradient background for small screens
        'bg-gradient-to-br from-slate-100 to-slate-50',
        'dark:bg-gradient-to-br dark:from-slate-800/50 dark:to-slate-700/50',

        // No background for large screens
        'lg:bg-white lg:dark:bg-zinc-900',
        'lg:bg-none lg:dark:bg-none',

        // Hover gradient for large screens
        'hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-50',
        'dark:hover:bg-gradient-to-br dark:hover:from-slate-800/50 dark:hover:to-slate-700/50',

        // Neumorphic hover shadow for large screens
        'hover:shadow-[6px_6px_12px_0px_rgba(0,0,0,0.2),-6px_-6px_12px_0px_rgba(255,255,255,0.8)]',
        'hover:dark:shadow-[-8px_-8px_12px_0px_rgba(0,0,0,0.6),8px_8px_12px_0px_rgba(255,255,255,0.05)]',
      )}
    >
      <div
        className={clsx(
          'max-w-80 rounded-xl',
          'transform',
          'shadow-[0_2px_8px_rgba(15,23,42,0.08)]',
          'bg-slate-200 dark:bg-slate-700',
        )}
      >
        <div className={clsx('overflow-hidden rounded-xl')}>
          <Image
            src={article.socialImage}
            alt={article.title}
            priority={priority}
            placeholder="blur"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-col">
        <h2
          className={clsx(
            'mb-1 text-base font-semibold leading-6',
            'text-slate-900 dark:text-white',
            'group-hover:text-blue-600 dark:group-hover:text-blue-400',
            'transition-colors duration-200 ease-in-out',
            'text-balance',
          )}
        >
          {article.title}
        </h2>
        <p
          className={clsx(
            'flex-grow',
            'text-balance text-sm leading-5',
            'lg:pr-8',
            'text-slate-500 dark:text-slate-400',
            'line-clamp-3',
          )}
        >
          {article.displayDescription}
        </p>
        <div
          aria-hidden="true"
          className={clsx(
            'relative z-10',
            'flex items-center',
            'flex-shrink-0',
            'whitespace-nowrap text-sm font-medium',
            'text-blue-600 dark:text-blue-400',
            'transition-all duration-200 ease-in-out',
          )}
        >
          <span className="whitespace-nowrap">View article</span>
          <span className="relative ml-1 h-5 w-5">
            <ChevronRightIcon
              className={clsx(
                'absolute h-4 w-4 stroke-current',
                'transition-all duration-200 ease-in-out',
                'left-0 group-hover:left-1',
                'top-[3px]',
              )}
            />
          </span>
        </div>
      </div>
    </div>
  )
}
