import Link from 'next/link';
import clsx from 'clsx';

export function SocialIcon({
	icon: Icon,
	...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
	icon: React.ComponentType<{ className?: string }>;
}) {
	return (
		<Link className="group -m-1 p-1" {...props}>
			<Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-blue-600 dark:group-hover:fill-blue-400 dark:fill-zinc-400 " />
		</Link>
	);
}

export function SocialLink({
	className,
	href,
	children,
	icon: Icon,
}: {
	className?: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	children: React.ReactNode;
}) {
	return (
		<li className={clsx(className, 'flex')}>
			<Link
				href={href}
				className="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-600 dark:text-zinc-200 dark:hover:text-blue-400"
			>
				<Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-600 dark:group-hover:fill-blue-400" />
				<span className="ml-4">{children}</span>
			</Link>
		</li>
	);
}
