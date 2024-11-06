import { Metadata } from 'next'

import { generateArticleMetadata } from '@/library/metadata'
import { ArticleLayout } from '@/components/ArticleLayout'
import { article } from './data'
import { Paragraph } from '@/components/Text'
import PreSaveCard from '@/components/PreSaveCard'

export const generateMetadata = (): Metadata => {
  return generateArticleMetadata(article)
}

export default function Page() {
  return (
    <ArticleLayout article={article}>
      <Paragraph>This is a paragraph</Paragraph>
      <PreSaveCard />
    </ArticleLayout>
  )
}
