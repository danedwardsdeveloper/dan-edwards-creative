'use client';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
	Prism as SyntaxHighlighter,
	type SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import {
	oneLight,
	a11yDark,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps extends Omit<SyntaxHighlighterProps, 'language'> {
	language:
		| 'javascript'
		| 'typescript'
		| 'html'
		| 'css'
		| 'tsx'
		| 'jsx'
		| 'plaintext'
		| 'bash'
		| 'json'
		| 'mjs';
	fileName: string;
	disableLineNumbers?: boolean;
}

type LanguageFormatting = {
	[key: string]: string;
};

const languageFormats: LanguageFormatting = {
	typescript: 'TypeScript',
	javascript: 'JavaScript',
	jsx: 'JSX',
	tsx: 'TSX',
	mjs: 'MJS',
	html: 'HTML',
	css: 'CSS',
	scss: 'SCSS',
	less: 'Less',
	json: 'JSON',
	yaml: 'YAML',
	markdown: 'Markdown',
	php: 'PHP',
	csharp: 'C#',
	cpp: 'C++',
};

function formatLanguage(language: string): string {
	return languageFormats[language];
}

const mapLanguage = (lang: string) => {
	if (lang === 'mjs') return 'javascript';
	return lang;
};

export const InlineCode = ({
	children,
	...props
}: React.HTMLAttributes<HTMLElement>) => (
	<code
		className={clsx(
			'text-sm font-mono break-words',
			'px-2 py-0.5 ',
			'border rounded  ',
			'bg-zinc-100 dark:bg-zinc-800',
			'border-zinc-400 dark:border-zinc-600',
			'text-blue-600 dark:text-blue-400 '
		)}
		{...props}
	>
		{children}
	</code>
);

export const CodeBlock = ({
	language,
	fileName,
	disableLineNumbers = false,
	children,
}: CodeBlockProps) => {
	const [copied, setCopied] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);
		setIsDarkMode(darkModeMediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
		darkModeMediaQuery.addEventListener('change', handleChange);

		return () =>
			darkModeMediaQuery.removeEventListener('change', handleChange);
	}, []);

	const handleCopyClick = () => {
		if (typeof children === 'string') {
			navigator.clipboard.writeText(children.trim());
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		}
	};

	const theme = isDarkMode
		? {
				...a11yDark,
				'pre[class*="language-"]': {
					...a11yDark['pre[class*="language-"]'],
					background: '#ffffff',
				},
				'code[class*="language-"]': {
					...a11yDark['code[class*="language-"]'],
					background: '#ffffff',
				},
				'react-syntax-highlighter-line-number': {
					fontStyle: 'normal',
					paddingRight: 20,
					color: '#9ca3af',
				},
			}
		: {
				...oneLight,
				'pre[class*="language-"]': {
					...oneLight['pre[class*="language-"]'],
					background: 'transparent',
				},
				'code[class*="language-"]': {
					...oneLight['code[class*="language-"]'],
					background: 'transparent',
				},
				'react-syntax-highlighter-line-number': {
					fontStyle: 'normal',
					paddingRight: 20,
					color: '#9ca3af',
				},
			};

	return (
		<div
			className={clsx(
				'rounded-lg',
				'border',
				'my-4',
				'dark:border-gray-700 border-gray-200'
			)}
		>
			<div
				className={clsx(
					'flex justify-between items-center',
					'pl-5 pr-2',
					'h-12',
					'dark:bg-gray-800 bg-gray-100',
					'rounded-t-lg',
					'border-b',
					'dark:border-b-gray-700 border-b-gray-200'
				)}
			>
				<div>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						{fileName}
					</span>
				</div>
				<div className="flex items-center">
					<span className="text-base text-center text-gray-500 mr-2">
						{formatLanguage(language)}
					</span>
					<button
						onClick={handleCopyClick}
						aria-label="Copy code"
						className={clsx(
							'flex items-center',
							'rounded',
							'hover:opacity-80'
						)}
					>
						<span className="text-2xl relative w-8 h-8 flex items-center justify-center">
							<span
								className={clsx(
									'absolute transition-all duration-200 ease-in-out',
									copied
										? 'opacity-100 transform'
										: 'opacity-0 transform'
								)}
							>
								✅
							</span>
							<span
								className={clsx(
									'absolute transition-all duration-200 ease-in-out',
									!copied
										? 'opacity-100 transform'
										: 'opacity-0 transform'
								)}
							>
								📋
							</span>
						</span>
					</button>
				</div>
			</div>
			<SyntaxHighlighter
				language={mapLanguage(language)}
				showLineNumbers={!disableLineNumbers}
				className="overflow-x-auto text-sm rounded-b-md"
				style={theme}
			>
				{children.trim()}
			</SyntaxHighlighter>
		</div>
	);
};
