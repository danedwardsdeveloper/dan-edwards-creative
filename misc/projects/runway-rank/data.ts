import { Metadata } from 'next';

import { generateProjectMetadata } from '@/library/metadata';
import { type Project } from '@/library/articles';
import runwaySocialImage from '../../../../public/images/social-images/runway-rank.png';
import runwayFullScreenshot from '../../../../public/images/full-screenshots/runway-rank-full-screenshot.png';

export const generateMetadata = (): Metadata => {
	return generateProjectMetadata(project);
};

export const project: Project = {
	title: 'Runway Rank',
	order: 4,
	display: true,
	displayDescription: `MERN web app that uses the Elo algorithm to rank lewks from RuPaul's Drag Race`,
	date: '2024-09-30',
	socialImage: runwaySocialImage,
	browserImage: {
		isScrolling: true,
		src: runwayFullScreenshot,
		displayURL: 'runway-rank.fly.dev',
	},
	liveURL: {
		type: 'Live site',
		src: 'https://runway-rank.fly.dev/',
	},
	gitHubURL: 'https://github.com/danedwardsdeveloper/runway-rank',
};
