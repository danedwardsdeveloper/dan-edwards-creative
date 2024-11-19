type Size = 'sm' | 'base'

export const baseStyles =
  'px-2.5 py-2 font-medium shrink-0 rounded block transition-colors duration-200 text-left'

export const mobileButtonStyles = 'px-2.5 py-1 inline-block cursor-pointer border border-blue-200'

export const colourStyles = {
  active: 'bg-blue-500/15 dark:bg-blue-900/80',
  inactive: 'hover:bg-blue-500/5 hover:text-blue-800',
  text: {
    sm: 'text-slate-800 dark:text-slate-200',
    base: 'text-slate-950 dark:text-slate-200',
  },
}

export const sizeStyles: Record<Size, string> = {
  sm: 'text-sm font-normal',
  base: 'text-base',
}
