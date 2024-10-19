'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import { Container } from '@/components/Container';
import { MoonIcon, SunIcon } from './Icons';

interface MenuItem {
	name: string;
	target: string;
}

export const menuItems: MenuItem[] = [
	{
		name: 'Articles',
		target: '/',
	},
];

function NavItem({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const isActive = usePathname() === href;

	return (
		<li>
			<Link
				href={href}
				className={clsx(
					'relative block',
					'px-3 py-2',
					'transition duration-200',
					isActive
						? ['text-blue-600 dark:text-blue-400', 'cursor-default']
						: [
								'hover:text-blue-600 dark:hover:text-blue-400',
								'cursor-pointer',
							]
				)}
			>
				{children}
				{isActive && (
					<span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/40 dark:to-blue-400/0" />
				)}
			</Link>
		</li>
	);
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
	return (
		<nav {...props}>
			<ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
				{menuItems.map((menuItem) => (
					<NavItem href={menuItem.target} key={menuItem.name}>
						{menuItem.name}
					</NavItem>
				))}
				<ThemeToggle />
			</ul>
		</nav>
	);
}

function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<button
			type="button"
			aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
			className={clsx(
				'group rounded-full bg-white/90 px-3 py-2',
				'backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
			)}
			onClick={() => setTheme(otherTheme)}
		>
			<SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-blue-50 [@media(prefers-color-scheme:dark)]:stroke-blue-400 [@media(prefers-color-scheme:dark)]:group-hover:fill-blue-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-600" />
			<MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-blue-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-blue-500" />
		</button>
	);
}

export function Header() {
	const isHomePage = usePathname() === '/';

	return (
		<>
			<header
				className="pointer-events-none relative z-50 flex flex-none flex-col"
				style={{
					height: 'var(--header-height)',
					marginBottom: 'var(--header-mb)',
				}}
			>
				<div className="top-0 z-10 h-16 pt-6">
					<Container className="top-[var(--header-top,theme(spacing.6))] w-full">
						<div className="relative flex gap-4">
							<div className="flex flex-1"></div>
							<div className="flex flex-1 justify-end md:justify-center">
								<DesktopNavigation className="pointer-events-auto" />
							</div>
							<div className="flex justify-end md:flex-1"></div>
						</div>
					</Container>
				</div>
			</header>
			{isHomePage && (
				<div
					className="flex-none"
					style={{ height: 'var(--content-offset)' }}
				/>
			)}
		</>
	);
}
