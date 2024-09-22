import { Metadata } from 'next';

import { IArticle } from '@/library/articles';
import { environment } from './environment';
import { StaticImageData } from 'next/image';

export const siteName = 'Dan Digresses';

export const defaultMetaTitle = `Dan Digresses | `;

export const defaultMetaDescription = ``;

export const defaultSocialImage = {
	absoluteUrl: `${environment.productionBaseURL}/images/social-png/social.png`,
	alt: 'Dan Digresses | blog with no particular theme',
	height: 675,
	width: 1200,
};

function extractImageName(image: StaticImageData): string {
	const fullPath = image.src;
	const filename = fullPath.split('/').pop() || '';
	const nameWithoutHashAndExtension = filename.replace(
		/\.[\w\d]+\.[^.]+$/,
		''
	);

	return nameWithoutHashAndExtension;
}

function generateAbsoluteURL(image: StaticImageData): string {
	const imageName = extractImageName(image);
	return `${environment.productionBaseURL}/images/social-png/${imageName}.png`;
}

export function generateArticleMetadata(article: IArticle): Metadata {
	const absoluteImageURL = generateAbsoluteURL(article.featuredImage);

	return {
		title: article.title,
		description: article.description,
		openGraph: {
			title: article.title,
			description: article.description,
			type: 'article',
			publishedTime: article.date,
			authors: [article.writer],
			images: [
				{
					url: absoluteImageURL,
					width: 1200,
					height: 675,
					alt: article.title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: article.title,
			description: article.description,
			images: [absoluteImageURL],
		},
	};
}
