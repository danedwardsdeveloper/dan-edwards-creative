'use client';
import { ContainerInner, ContainerOuter } from '@/components/Container';

export function Footer() {
	return (
		<footer className="mt-32 flex-none">
			<ContainerOuter>
				<div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
					<ContainerInner>
						<div className="flex flex-col items-center justify-end gap-6 sm:flex-row">
							<p className="text-sm text-zinc-500 dark:text-zinc-400">
								&copy; {new Date().getFullYear()}, Dan Edwards
							</p>
						</div>
					</ContainerInner>
				</div>
			</ContainerOuter>
		</footer>
	);
}
