import clsx from 'clsx'
import Link from 'next/link'

const variantStyles = {
  primary:
    'bg-blue-500 font-semibold text-white hover:bg-blue-600 active:bg-blue-600 active:text-white-100/70 dark:bg-blue-700 dark:hover:bg-blue-600 dark:active:bg-blue-700 dark:active:text-blue-100/70',
  secondary:
    'bg-zinc-100 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
  green:
    'bg-emerald-400 font-semibold text-black hover:bg-emerald-500 active:bg-emerald-700 active:text-white/70',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm  transition active:transition-none w-full',
    'outline-offset-4 focus:outline-blue-500',
    'w-full',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
