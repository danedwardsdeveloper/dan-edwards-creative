import { type Project } from '@/library/articles';
import tempSocialImage from './images/temp-social-image.png';
import scrollingBrowserImage from './images/array-of-sunshine-full-screenshot.png';

export const project: Project = {
	title: 'Array of Sunshine',
	order: 1,
	display: true,
	displayDescription:
		'SEO-optimised coding blog built with Next.js and an ultra-minimal design',
	date: '2024-09-30',
	socialImage: tempSocialImage,
	browserImage: {
		isScrolling: true,
		src: scrollingBrowserImage,
		displayURL: 'arrayofsunshine.co.uk',
	},
	liveURL: {
		type: 'Live site',
		src: `https://arrayofsunshine.co.uk`,
	},
	gitHubURL: 'https://github.com/danedwardsdeveloper/array-of-sunshine',
};
