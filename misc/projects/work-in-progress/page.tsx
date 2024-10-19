// import { Metadata } from 'next';

import { project } from './data';
import Browser from '@/components/Browser';
import { ProjectLayout } from '@/components/ArticleLayout';
import coffee from '../../../../public/images/webp/coffee.webp';
import { Paragraph } from '@/components/Text';
import { CodeBlock } from '@/components/Code';

// export const generateMetadata = (): Metadata => {
// 	return generateArticleMetadata(project);
// };

export default function Page() {
	return (
		<ProjectLayout project={project}>
			<Paragraph>
				{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit perferendis, cupiditate officiis enim labore, officia deleniti inventore nisi sapiente ea quo illum iure odio laborum minima, cumque corrupti placeat nam!`}
			</Paragraph>
		</ProjectLayout>
	);
}
