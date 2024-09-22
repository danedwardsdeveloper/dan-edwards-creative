import StyledLink from '@/components/StyledLink';
import ArticlesList from '@/components/ArticlesList';
import Paragraph from '@/components/Paragraph';

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
				Dan Digresses
			</h1>
			<Paragraph>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
				vitae facere reprehenderit mollitia veritatis odio quaerat
				dignissimos. Esse ipsam exercitationem minima. Fuga minima eveniet
				sunt nostrum nulla culpa laudantium quam.
			</Paragraph>
			<div className="my-8">
				<ArticlesList />
			</div>
		</section>
	);
}
