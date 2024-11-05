import { type Metadata } from 'next'
import { StaticImageData } from 'next/image'
import { productionBaseURL } from './environment'
import { type Article } from './articles'

<<<<<<< HEAD
import { type Article } from './articles';

export const siteName = 'Dan Edwards developer';
export const productionBaseURL = `https://dandigresses.co.uk`;
export const defaultMetaTitle = `Dan Edwards developer | Full-stack software engineer`;
export const defaultMetaDescription = `I'm a full-stack web developer specialising in Node.js, TypeScript, and Next.js. Explore my portfolio and get in touch today.`;
=======
export const siteName = 'Dan Edwards creative'
export const defaultMetaTitle = `Dan Edwards creative | Pop music producer & songwriter`
export const defaultMetaDescription = `Dan Edwards creative | Pop music producer & songwriter`
>>>>>>> be8b6bb38f6286aed64a94574749990d540713ad
export const defaultKeywords =
  'Pop music, music producer, UK, songwriter, pop music producer'
export const defaultSocialImage = {
  absoluteUrl: `${productionBaseURL}/images/dan-edwards-developer.png`,
  alt: 'Dan Edwards developer | Full-Stack Node programmer',
  height: 630,
  width: 1200,
}

function extractImageName(image: StaticImageData): string {
  const fullPath = image.src
  const filename = fullPath.split('/').pop() || ''
  const nameWithoutHashAndExtension = filename.replace(/\.[\w\d]+\.[^.]+$/, '')

  return nameWithoutHashAndExtension
}

function generateAbsoluteURL(image: StaticImageData): string {
  const imageName = extractImageName(image)
  return `${productionBaseURL}/images/${imageName}.png`
}

export function generateArticleMetadata(article: Article): Metadata {
  const absoluteImageURL = generateAbsoluteURL(article.socialImage)

  return {
    title: `${article.title} | Software development article by Dan Edwards`,
    description: article.metaDescription || article.displayDescription,
    openGraph: {
      title: article.title,
      description: article.displayDescription,
      type: 'article',
      publishedTime: article.date,
      authors: ['Dan Edwards'],
      images: [
        {
          url: absoluteImageURL,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.displayDescription,
      images: [absoluteImageURL],
    },
  }
}
