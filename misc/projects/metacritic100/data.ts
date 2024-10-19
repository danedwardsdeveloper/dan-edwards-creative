import { Metadata } from 'next';

import { type Project } from '@/library/articles';
import { generateProjectMetadata } from '@/library/metadata';
import metacriticSocialImage from '../../../../public/images/social-images/metacritic100.png';
import metacriticFullScreenshot from '../../../../public/images/full-screenshots/metacritic100-full-screenshot.png';

export const generateMetadata = (): Metadata => {
	return generateProjectMetadata(project);
};

export const project: Project = {
	title: 'Metacritic 100',
	order: 5,
	display: true,
	displayDescription: `A MERN web app to track how many of Metacritic's top 100 films you've seen`,
	metaDescription: `A web app to track how many of Metacritic's top 100 films you've seen, created with MongoDB, Express, React, and Node.`,
	date: '2024-09-30',
	socialImage: metacriticSocialImage,
	browserImage: {
		isScrolling: true,
		src: metacriticFullScreenshot,
		displayURL: 'metacritic100.com',
	},
	liveURL: {
		type: 'Live site',
		src: 'https://metacritic100.com',
	},
	gitHubURL: 'https://github.com/danedwardsdeveloper/metacritic100',
};
