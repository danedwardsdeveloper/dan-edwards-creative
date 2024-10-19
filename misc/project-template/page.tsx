import { article } from './data';
import { ArticleLayout } from '@/components/ArticleLayout';
import { Paragraph } from '@/components/Text';

export default function Page() {
	return (
		<ArticleLayout article={article}>
			<Paragraph>
				{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit perferendis, cupiditate officiis enim labore, officia deleniti inventore nisi sapiente ea quo illum iure odio laborum minima, cumque corrupti placeat nam!`}
			</Paragraph>
		</ArticleLayout>
	);
}
