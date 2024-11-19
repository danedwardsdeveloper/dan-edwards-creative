import { Metadata } from 'next'

import { generateArticleMetadata } from '@/library/metadata'

import { ArticleLayout } from '@/components/ArticleLayout'
import { Paragraph } from '@/components/Text'

import { article } from './data'

export const generateMetadata = (): Metadata => {
  return generateArticleMetadata(article)
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <Paragraph></Paragraph>
    </ArticleLayout>
  )
}
