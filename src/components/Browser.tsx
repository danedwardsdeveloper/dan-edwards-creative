import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

interface BrowserProps {
	src: StaticImageData;
	url: string;
	alt: string;
	classes?: string;
}

export default function Browser({ src, url, alt, classes }: BrowserProps) {
	return (
		<div
			className={clsx(
				'border-gray-300 dark:border-gray-800',
				'rounded-xl',
				'max-w-3xl mx-auto  border',
				'shadow-lg md:shadow-2xl',
				'shadow-gray-500 dark:shadow-gray-900',
				classes
			)}
		>
			<div
				className={clsx(
					'bg-gray-300 dark:bg-gray-700',
					'px-4 py-2 flex items-center justify-between',
					'rounded-t-xl'
				)}
			>
				<div className="flex space-x-2">
					<div className="w-3 h-3 bg-red-500 rounded-full"></div>
					<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
					<div className="w-3 h-3 bg-green-500 rounded-full"></div>
				</div>

				<div
					className={clsx(
						'bg-gray-50 dark:bg-gray-700',
						'rounded px-2 max-w-[300px] w-full ml-3 md:ml-0'
					)}
				>
					<p className="text-sm text-gray-500 dark:text-gray-100 truncate text-center">
						{url}
					</p>
				</div>
				<div className="hidden md:block w-[51px]"></div>
			</div>
			<div className="w-full relative overflow-hidden rounded-b-xl">
				<Image
					src={src}
					alt={alt}
					className={clsx(
						'hover:scale-105 transition-all duration-1000 ease-in-out'
					)}
				/>
			</div>
		</div>
	);
}
