import { type Metadata } from 'next';

import { Container } from '@/components/Container';
import { getAllArticles } from '@/library/articles';
import ArticlesList from '@/components/ArticlesList';

export const metadata: Metadata = {
	title: `Dan Digresses`,
	// ToDo
	description: ``,
};

export default async function ProjectsPage() {
	const articles = await getAllArticles();

	return (
		<Container className="mt-16 sm:mt-32">
			<header className="max-w-2xl">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 text-balance">
					{`Dan Digresses`}
				</h1>
				<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 text-balance">
					{`I'm `}
					<em>{`always`}</em>
					{` busy with a project. I've been programming for nearly a year now, and I've made lots of different sites, apps and scripts of varying scales and complexities. Here are my favorite ones, plus my work in progress and ambitious plans for the future.`}
				</p>
			</header>
			<div className="mt-16 sm:mt-20">
				<ArticlesList articles={articles} />
			</div>
		</Container>
	);
}
