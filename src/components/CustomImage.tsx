import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

interface CustomImageProps {
	src: StaticImageData;
	priority: boolean;
	alt: string;
	classes?: string;
}

export default function CustomImage({
	src,
	priority,
	alt,
	classes,
}: CustomImageProps) {
	return (
		<div className={clsx('rounded-xl overflow-hidden')}>
			<Image
				src={src}
				alt={alt}
				priority={priority}
				className={clsx(classes)}
			/>
		</div>
	);
}
