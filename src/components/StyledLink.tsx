import { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface StyledLinkProps {
	href: string;
	ariaLabel?: string;
	children: ReactNode;
	classes?: string;
}

export default function StyledLink({
	href,
	ariaLabel,
	children,
	classes,
}: StyledLinkProps) {
	const isExternal = href.startsWith('http') || href.startsWith('//');

	const targetRelationProps = isExternal
		? { target: '_blank', rel: 'noopener noreferrer' }
		: {};

	return (
		<Link
			href={href}
			aria-label={ariaLabel}
			title={ariaLabel}
			className={clsx(
				'text-blue-600 hover:text-blue-400',
				'dark:text-blue-500 dark:hover:text-blue-700',
				'transition-all duration-200',
				'underline underline-offset-2 decoration-slate-300 dark:decoration-slate-600',
				classes
			)}
			{...targetRelationProps}
		>
			{children}
		</Link>
	);
}
