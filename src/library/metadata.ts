import { productionBaseURL } from './environment'

export const siteName = 'Dan Edwards creative'

export const baseMetaTitle = `Pop music producer & songwriter in Salisbury, UK`

const defaultMetaDescription =
  'Professional pop music producer and songwriter in Salisbury, UK. Dan Edwards is an expert in music theory with a talent for crafting catchy melodies.'

function createSubPageTitle(verb: string) {
  return `${verb} Dan Edwards | ${baseMetaTitle}`
}

function generateCanonical(path: string) {
  const formattedPath = path.startsWith('/') ? path : `/${path}`
  const cleanPath = formattedPath.endsWith('/') ? formattedPath.slice(0, -1) : formattedPath
  return `${productionBaseURL}${cleanPath}`
}

export const defaultKeywords = 'Pop music, music producer, UK, songwriter, pop music producer'

export const defaultSocialImage = {
  absoluteUrl: `${productionBaseURL}/social-images/dan-edwards-pop-music-producer-and-songwriter.png`,
  alt: 'Dan Edwards - Pop music producer and songwriter in Salisbury, UK',
  height: 630,
  width: 1200,
}

export const siteMetadata: { [key: string]: { title: string; description: string; canonical: string } } = {
  home: {
    title: `${siteName} | ${baseMetaTitle}`,
    description: defaultMetaDescription,
    canonical: generateCanonical(''),
  },
  workWithMe: {
    title: createSubPageTitle('Work with'),
    description:
      'Prize-winning composer, pop producer and songwriter in Salisbury, UK, seeking collaborations with singers and songwriters for commercial pop releases. ',
    canonical: generateCanonical('/work-with-me'),
  },
  contact: {
    title: createSubPageTitle('Contact'),
    description:
      'Get in touch with Dan Edwards, pop music producer and songwriter in Salisbury. Available for songwriting collaborations and music production projects.',
    canonical: generateCanonical('/contact'),
  },
  links: {
    title: createSubPageTitle('Links for'),
    description:
      'Connect with Dan Edwards across social media and music platforms. Listen to latest releases, follow updates, and explore collaboration opportunities.',
    canonical: generateCanonical('/links'),
  },
  error: {
    title: `Error | ${siteName}`,
    description:
      'An error occurred while processing your request. Please try again or contact Dan Edwards for assistance.',
    canonical: generateCanonical('/error'),
  },
  confirm: {
    title: `Confirm your newsletter subscription | ${siteName}`,
    description: `Don't miss the latest updates and exclusive content from pop music producer and songwriter Dan Edwards.`,
    canonical: generateCanonical('/confirm'),
  },
  unsubscribe: {
    title: `Unsubscribe from my newsletter | ${siteName}`,
    description: defaultMetaDescription,
    canonical: generateCanonical('/unsubscribe'),
  },
  notFound: {
    title: `Page not found | ${siteName}`,
    description: defaultMetaDescription,
    canonical: generateCanonical('/not-found'),
  },
}
