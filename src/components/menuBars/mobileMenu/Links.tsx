import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menuItems } from '../menuItems'
import { baseStyles, colourStyles, sizeStyles } from '../styles'

const menuItemsWithoutHome = menuItems.filter(
  menuItem => menuItem.displayName !== 'Home' || menuItem.href !== '/',
)

export default function Links({ gap = 'gap-y-1' }: { gap?: string }) {
  const currentPath = usePathname()

  return (
    <ul className={clsx('flex flex-col', gap)}>
      {menuItemsWithoutHome.map(item => {
        const isActive = currentPath === item.href

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive && 'page'}
              className={clsx(
                baseStyles,
                sizeStyles['base'],
                colourStyles.text['base'],
                isActive ? colourStyles.active : colourStyles.inactive,
              )}
            >
              {item.displayName}
              {isActive && <span className="sr-only"> (current page)</span>}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
