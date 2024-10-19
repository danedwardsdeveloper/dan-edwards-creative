import { Metadata } from 'next';

import { generateProjectMetadata } from '@/library/metadata';
import { type Project } from '@/library/articles';
import songShopScreenshot from '../../../../public/images/song-shop-screenshot.png';

export const generateMetadata = (): Metadata => {
	return generateProjectMetadata(project);
};

export const project: Project = {
	title: 'Work in progress',
	order: 6,
	display: true,
	displayDescription: `A collection of projects I'm finishing up on, plus ambitious projects for the future.`,
	date: '2024-10-04',
	socialImage: songShopScreenshot,
	browserImage: {
		src: songShopScreenshot,
		isScrolling: false,
		displayURL: 'songshop.io',
	},
};
