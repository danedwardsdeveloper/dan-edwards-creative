import { type Metadata } from 'next';

import { Container } from '@/components/Container';
import { getAllArticles } from '@/library/articles';
import ArticlesList from '@/components/ArticlesList';
import { productionBaseURL } from '@/library/metadata';

export const metadata: Metadata = {
	title: `Home | Dan Digresses - a blog without a theme`,
	description: `Unfocused & random blog where I write about stuff that I want to write about.`,
	alternates: {
		canonical: productionBaseURL,
	},
};

export default async function Home() {
	const articles = await getAllArticles();

	return (
		<Container className="mt-16 sm:mt-32">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 text-balance">
					{`Dan Digresses`}
				</h1>
				<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 text-balance">
					{`Hey, welcome to my blog! I'm Dan - a practical/ creative/
					intellectual/ philosophical type of guy. This is my unfocused &
					random blog where I write about stuff that I want to write about.`}
				</p>
			</header>
			<div className="mt-16 sm:mt-20">
				<ArticlesList articles={articles} />
			</div>
		</Container>
	);
}
