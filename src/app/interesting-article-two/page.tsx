import { Metadata } from 'next';

import { generateProjectMetadata } from '@/library/metadata';
import { ProjectLayout } from '@/components/ArticleLayout';
import { project } from './data';
import { Paragraph } from '@/components/Text';

export const generateMetadata = (): Metadata => {
	return generateProjectMetadata(project);
};

export default function Page() {
	return (
		<ProjectLayout project={project}>
			<Paragraph></Paragraph>
		</ProjectLayout>
	);
}
