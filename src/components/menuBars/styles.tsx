import clsx from 'clsx'

export const menuItemTextStyles = {
  base: clsx(
    'transition duration-200', //
    'font-medium',
    'hover:text-blue-600 dark:hover:text-blue-400',
    'focus:text-blue-500 dark:hover:text-blue-400',
    'cursor-pointer',
  ),
  inactive: 'text-zinc-800 dark:text-zinc-200',
  active: 'text-blue-600 dark:text-blue-400 cursor-default',
}
