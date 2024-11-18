import PreSaveCard from '@/components/PreSaveCard'
import TwoColumnLayout from '@/components/TwoColumnLayout'
import SplashScreen from '@/components/SplashScreen'
import ArticlesList from '@/components/ArticlesList'
import { getAllArticles } from '@/library/articles'

export default async function Home() {
  const articles = await getAllArticles()

  return (
    <SplashScreen>
      <TwoColumnLayout
        title={`Dan Edwards`}
        intro={`Pop music producer & songwriter in Salisbury, UK.`}
        columnOne={<ArticlesList articles={articles} />}
        columnTwo={<PreSaveCard />}
      />
    </SplashScreen>
  )
}
