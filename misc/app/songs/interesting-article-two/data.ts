import { Metadata } from 'next'

import { type Article } from '@/library/articles'
import { generateArticleMetadata } from '@/library/metadata'

import plantCounterSocialImage from '../../../../public/images/plant-counter-ios-app.png'

export const generateMetadata = (): Metadata => {
  return generateArticleMetadata(article)
}

export const article: Article = {
  title: 'This is in the songs directory!',
  display: true,
  displayDescription:
    'An iOS app to help people keep track of the number of plant foods they consume. An iOS app to help people keep track of the number of plant foods they consume.',
  metaDescription:
    'An iPhone app that helps people to keep track of the number of plant foods they consume, built with React Native and Expo.',
  date: '2020-01-01',
  socialImage: plantCounterSocialImage,
}
