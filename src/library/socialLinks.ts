import { type ComponentType } from 'react'

import { GitHubIcon, LinkedInIcon } from '@/components/Icons'

interface SocialLink {
  name: string
  href: string
  icon: ComponentType<{ className?: string }>
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', href: '', icon: GitHubIcon },
  { name: 'LinkedIn', href: '', icon: LinkedInIcon },
]
