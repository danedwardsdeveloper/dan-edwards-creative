import { Metadata } from 'next';

import { type Article } from '@/library/articles';
import { generateArticleMetadata } from '@/library/metadata';

import pieceOfMeSocial from '../../../public/images/piece-of-me-social-image.png';

export const generateMetadata = (): Metadata => {
	return generateArticleMetadata(article);
};

export const article: Article = {
	title: `Pre-save my new single: Piece of Me ft. rowan`,
	display: true,
	displayDescription: '',
	metaDescription:
		'An iPhone app that helps people to keep track of the number of plant foods they consume, built with React Native and Expo.',
	date: '2024-10-10',
	socialImage: pieceOfMeSocial,
};
