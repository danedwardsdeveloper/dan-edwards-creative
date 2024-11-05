import { Metadata } from 'next';

import { generateArticleMetadata } from '@/library/metadata';
import { ArticleLayout } from '@/components/ArticleLayout';
import { article } from './data';
import { Paragraph } from '@/components/Text';
import PreSaveCard from './PreSaveCard';

import pieceOfMeSquare from './images/piece-of-me-dan-edwards-ft-rowan-artwork.png';

export const generateMetadata = (): Metadata => {
	return generateArticleMetadata(article);
};

export default function Page() {
	return (
		<ArticleLayout article={article}>
			<Paragraph>This is a paragraph</Paragraph>
			<PreSaveCard
				image={pieceOfMeSquare}
				trackName={'Piece of Me ft. rowan'}
				spotifyURI={''}
				releaseDate={'2024-11-08'}
			/>
		</ArticleLayout>
	);
}
