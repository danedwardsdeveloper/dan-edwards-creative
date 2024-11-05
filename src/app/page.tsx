import { type Metadata } from 'next'

// import ArticlesList from '@/components/ArticlesList'
import { Container } from '@/components/Container'
// import { getAllArticles } from '@/library/articles'
import { productionBaseURL } from '@/library/environment'
import PreSaveCard from '@/components/PreSaveCard'

export const metadata: Metadata = {
	title: `Home | Dan Digresses - a blog without a theme`,
	description: `Unfocused & random blog where I write about stuff that I want to write about.`,
	alternates: {
		canonical: productionBaseURL,
	},
};

export default async function Home() {
  // const articles = await getAllArticles()
export default async function Home() {
	const articles = await getAllArticles();

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {`Dan Edwards`}
        </h1>
        <p className="mt-6 text-balance text-base text-zinc-600 dark:text-zinc-400">
          {`Pop music producer & songwriter in Salisbury, UK.`}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        <PreSaveCard />
        {/* <ArticlesList articles={articles} /> */}
      </div>
    </Container>
  )
}
