import glob from 'fast-glob';
import path from 'path';
import { type StaticImageData } from 'next/image';

export interface Article {
	title: string;
	display: boolean;
	displayDescription: string;
	metaDescription?: string;
	date: string;
	socialImage: StaticImageData;
}

export interface ArticleWithSlug extends Article {
	slug: string;
}

export async function getArticleData(
	slug: string
): Promise<ArticleWithSlug | null> {
	try {
		const articleModule = await import(`../app/${slug}/data`);
		console.log(articleModule);
		const articleData = articleModule.article as Article;

		return {
			...articleData,
			slug: slug,
		};
	} catch (error) {
		console.error(`Error reading article ${slug}:`, error);
	}

	return null;
}

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
	try {
		const articlePaths = await glob('src/app/*', {
			onlyDirectories: true,
		});

		const articles = await Promise.all(
			articlePaths.map(async (projectPath) => {
				const slug = path.basename(projectPath);
				return await getArticleData(slug);
			})
		);

		return articles
			.filter((project): project is ArticleWithSlug => project !== null)
			.filter((project) => project.display)
			.sort((a, b) => {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				return dateB.getTime() - dateA.getTime();
			});
	} catch (error) {
		console.error('Error fetching articles:', error);
		return [];
	}
}
