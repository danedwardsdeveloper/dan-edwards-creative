import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menuItemTextStyles } from '../styles'

export default function DesktopMenuItems({ href, children }: { href: string; children: React.ReactNode }) {
  const currentPath = usePathname()
  const isActive = currentPath === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          menuItemTextStyles.base,
          'relative block',
          'px-3 py-2',
          'text-sm',
          isActive ? menuItemTextStyles.active : menuItemTextStyles.inactive,
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0" />
        )}
      </Link>
    </li>
  )
}
