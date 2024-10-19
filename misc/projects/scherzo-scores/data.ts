import { Metadata } from 'next';

import { type Project } from '@/library/articles';
import tempSocialImage from './temp-social-image.png';
import tempScrollImage from './scroll-test.png';
import { generateProjectMetadata } from '@/library/metadata';

export const generateMetadata = (): Metadata => {
	return generateProjectMetadata(project);
};

export const project: Project = {
	title: 'Scherzo Scores',
	order: 3,
	display: true,
	displayDescription:
		'Next.js site for my sheet music publishing passive-income side hustle',
	date: '2024-09-30',
	socialImage: tempSocialImage,
	browserImage: {
		isScrolling: true,
		src: tempScrollImage,
		displayURL: 'scherzoscores.co.uk',
	},
	liveURL: {
		type: 'Live site',
		src: `https://scherzoscores.co.uk`,
	},
};
