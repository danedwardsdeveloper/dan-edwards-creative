interface MenuItem {
  displayName: string
  href: string
}

export const mobileMenuItems: MenuItem[] = [
  {
    displayName: 'Work with me',
    href: '/work-with-me',
  },
  {
    displayName: 'Contact',
    href: '/contact',
  },
  {
    displayName: 'Links',
    href: '/links',
  },
]

const homeMenuItem: MenuItem = {
  displayName: 'Home',
  href: '/',
}

export const desktopMenuItems: MenuItem[] = [homeMenuItem, ...mobileMenuItems]
