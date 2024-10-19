'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

import ArticlePreview from './ArticlePreview';
import { type ArticleWithSlug } from '@/library/articles';

interface ArticlesListProps {
	articles: ArticleWithSlug[];
	classes?: string;
}

export default function ArticlesList({ articles, classes }: ArticlesListProps) {
	const articlesRef = useRef<(HTMLLIElement | null)[]>([]);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;

		let ctx: gsap.Context;

		const setupAnimations = () => {
			if (typeof window === 'undefined') return;

			gsap.registerPlugin(ScrollTrigger);

			ctx = gsap.context(() => {
				articlesRef.current.forEach((article, index) => {
					if (article) {
						gsap.fromTo(
							article,
							{
								opacity: 0,
								y: 50,
							},
							{
								opacity: 1,
								y: 0,
								duration: 3,
								ease: 'power3.out',
								scrollTrigger: {
									trigger: article,
									start: 'top bottom-=10%',
									end: 'top center',
									toggleActions: 'play none none none',
									// markers: true,
								},
								delay: index * 0.1,
							}
						);
					}
				});
			});
		};

		requestAnimationFrame(() => {
			requestAnimationFrame(setupAnimations);
		});

		return () => {
			if (ctx) ctx.revert();
		};
	}, [isClient, articles]);

	const setArticleRef = (element: HTMLLIElement | null, index: number) => {
		articlesRef.current[index] = element;
	};

	return (
		<ul role="list" className={clsx(classes)}>
			{articles.map((article, index) => (
				<li key={index} ref={(element) => setArticleRef(element, index)}>
					<ArticlePreview article={article} priority={index < 2} />
				</li>
			))}
		</ul>
	);
}
