'use client';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
	const searchParams = useSearchParams();
	const errorMessage = searchParams.get('message') || 'An error occurred';

	return (
		<div className="max-w-sm mx-auto mt-12">
			<h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
			<p className="text-slate-700 dark:text-slate-300 mb-6">
				{errorMessage}
			</p>
			<Button onClick={() => window.history.back()}>Back</Button>
		</div>
	);
}

export default function ErrorPage() {
	return (
		<Container>
			<Suspense fallback={<div>Loading...</div>}>
				<ErrorContent />
			</Suspense>
		</Container>
	);
}
