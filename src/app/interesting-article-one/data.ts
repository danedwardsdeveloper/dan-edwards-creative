import { Metadata } from 'next';

import { type Article } from '@/library/articles';
import plantCounterSocialImage from '../../../public/images/plant-counter-ios-app.png';
import { generateArticleMetadata } from '@/library/metadata';

export const generateMetadata = (): Metadata => {
	return generateArticleMetadata(article);
};

export const article: Article = {
	title: 'Plant Counter',
	display: true,
	displayDescription:
		'An iOS app to help people keep track of the number of plant foods they consume.',
	metaDescription:
		'An iPhone app that helps people to keep track of the number of plant foods they consume, built with React Native and Expo.',
	date: '2024-09-30',
	socialImage: plantCounterSocialImage,
};
