interface MenuItem {
  displayName: string
  href: string
}

export const menuItems: MenuItem[] = [
  {
    displayName: 'Home',
    href: '/',
  },
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