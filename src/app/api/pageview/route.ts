import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/library/mongodb';
import { Document } from 'mongodb';

const ignoredPages = ['/analytics'];

export async function POST(request: NextRequest) {
	try {
		const body: { page: string } = await request.json();
		const { page } = body;

		if (!page) {
			return NextResponse.json(
				{ error: 'Page is required' },
				{ status: 400 }
			);
		}

		if (ignoredPages.includes(page)) {
			return NextResponse.json({ message: 'Ignored analytics page view' });
		}

		// const ip =
		// 	request.ip || request.headers.get('x-forwarded-for') || '0.0.0.0';

		// if (ip === '::1' || ip === '127.0.0.1') {
		// 	return NextResponse.json({ message: 'Ignored localhost view' });
		// }

		const client = await clientPromise;
		const db = client.db('page-views');
		const collection = db.collection('dan-digresses');

		await collection.updateOne(
			{ page },
			{
				$inc: { totalViews: 1 },
				$push: {
					views: { $each: [{ timestamp: new Date() }] },
				},
			} as Document,
			{ upsert: true }
		);

		return NextResponse.json({
			message: 'View counted successfully',
			page,
		});
	} catch (error) {
		console.error('Error counting page view:', error);
		return NextResponse.json(
			{ error: 'Failed to count page view' },
			{ status: 500 }
		);
	}
}
