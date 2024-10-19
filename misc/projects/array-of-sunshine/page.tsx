import { Metadata } from 'next';

import { project } from './data';
import Browser from '@/components/Browser';
import { ProjectLayout } from '@/components/ArticleLayout';
import coffee from '../../../../public/images/webp/coffee.webp';
import { Paragraph } from '@/components/Text';
import { CodeBlock } from '@/components/Code';
import { generateProjectMetadata } from '@/library/metadata';

export const generateMetadata = (): Metadata => {
	return generateProjectMetadata(project);
};

export default function Page() {
	return (
		<ProjectLayout project={project}>
			<Paragraph>
				{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit perferendis, cupiditate officiis enim labore, officia deleniti inventore nisi sapiente ea quo illum iure odio laborum minima, cumque corrupti placeat nam!`}
			</Paragraph>
			<CodeBlock
				language={'typescript'}
				fileName={'index.ts'}
			>{`export async function getAllProjects(): Promise<ProjectWithSlug[]> {
	try {
		const projectPaths = await glob('src/app/projects/*', {
			onlyDirectories: true,
		});

		const projects = await Promise.all(
			projectPaths.map(async (projectPath) => {
				const slug = path.basename(projectPath);
				return await getProjectData(slug);
			})
		);

		return projects
			.filter((project): project is ProjectWithSlug => project !== null)
			.filter((project) => project.display)
			.sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
			);
	} catch (error) {
		console.error('Error fetching projects:', error);
		return [];
	}
}`}</CodeBlock>
			<Browser src={coffee} url={`coffee.com`} alt={`Coffee website`} />
		</ProjectLayout>
	);
}
