import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { mobileMenuItems } from '../data'
import { menuItemTextStyles } from '../styles'

export default function MobileMenuItems() {
  const currentPath = usePathname()

  return (
    <>
      {mobileMenuItems.map(item => {
        const isActive = currentPath === item.href

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive && 'page'}
              className={clsx(
                menuItemTextStyles.base,
                'text-base',
                isActive ? menuItemTextStyles.active : menuItemTextStyles.inactive,
              )}
            >
              {item.displayName}
              {isActive && <span className="sr-only"> (current page)</span>}
            </Link>
          </li>
        )
      })}
    </>
  )
}
