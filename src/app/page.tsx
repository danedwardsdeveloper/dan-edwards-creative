import { type Metadata } from 'next'

import ArticlesList from '@/components/ArticlesList'
import { getAllArticles } from '@/library/articles'
import { productionBaseURL } from '@/library/environment'
import PreSaveCard from '@/components/PreSaveCard'
import TwoColumnLayout from '@/components/TwoColumnLayout'

export const metadata: Metadata = {
  title: `Dan Edwards creative | Pop music producer and songwriter in Salisbury, UK.`,
  description: `Dan Edwards is a classically trained professional pop music producer and song writer.`,
  alternates: {
    canonical: productionBaseURL,
  },
}

export default async function Home() {
  const articles = await getAllArticles()

  return (
    <TwoColumnLayout
      title={`Dan Edwards`}
      intro={`Pop music producer & songwriter in Salisbury, UK.`}
      columnOne={<ArticlesList articles={articles} />}
      columnTwo={<PreSaveCard />}
    />
  )
}
