import Link from 'next/link';
import clsx from 'clsx';
import { getAllArticles } from '@/library/articles';
import formatDate from '@/library/formatDate';
import { FeaturedImage } from './Images';

export default async function ArticlesList() {
	const articles = await getAllArticles();

	if (articles.length === 0) {
		return <p>No articles found.</p>;
	}

	return (
		<div>
			{articles.map((article) => (
				<Link
					key={article.slug}
					href={`/articles/${article.slug}`}
					className={clsx(
						'flex flex-col space-y-1 my-3 p-1',
						'hover:bg-orange-50 rounded-md transition-all duration-300',
						'p-2'
					)}
				>
					<div
						className={clsx(
							'w-full flex flex-col md:flex-row space-x-0 md:space-x-2'
						)}
					>
						<p
							className={clsx(
								'text-neutral-600 dark:text-neutral-400 tabular-nums',
								'md:w-40 md:flex-shrink-0 md:mr-2'
							)}
						>
							{formatDate(article.date)}
						</p>
						<div>
							<p
								className={clsx(
									'text-neutral-900 dark:text-neutral-100 tracking-tight'
								)}
							>
								{article.title}
							</p>
							<FeaturedImage
								image={article.featuredImage}
								alt={article.title}
							/>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
