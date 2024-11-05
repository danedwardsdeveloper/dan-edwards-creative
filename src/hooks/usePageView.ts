'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function usePageView() {
	const pathname = usePathname();

	useEffect(() => {
		const countView = async () => {
			try {
				await fetch('/api/pageview', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ page: pathname }),
				});
			} catch (error) {
				console.error('Error logging page view:', error);
			}
		};

		if (pathname) {
			countView();
		}
	}, [pathname]);
}
