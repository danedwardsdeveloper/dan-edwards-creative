import clsx from 'clsx'

export function Paragraph({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx('text-zinc-600 dark:text-zinc-400', 'my-7', className)} {...props}>
      {children}
    </p>
  )
}

export function Strong({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <strong className={clsx('text-zinc-900 dark:text-zinc-200', 'font-semibold', className)} {...props}>
      {children}
    </strong>
  )
}
