import Browser from '@/components/Browser';
import { ProjectLayout } from '@/components/ArticleLayout';
import coffee from '../../../../public/images/webp/coffee.webp';
import { project } from './data';

// export const generateMetadata = (): Metadata => {
// 	return generateArticleMetadata(project);
// };

export default function Page() {
	return (
		<ProjectLayout project={project}>
			<p>
				{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit perferendis, cupiditate officiis enim labore, officia deleniti inventore nisi sapiente ea quo illum iure odio laborum minima, cumque corrupti placeat nam!`}
			</p>
			<Browser src={coffee} url={`coffee.com`} alt={`Coffee website`} />
		</ProjectLayout>
	);
}
