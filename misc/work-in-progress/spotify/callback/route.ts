import { NextRequest, NextResponse } from 'next/server';
import { environment } from '@/library/environment';

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const dynamicBaseURL = environment.dynamicBaseURL;

const ALBUM_ID = '1j4w9XSeU99nAtmZSKOMXh';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const code = searchParams.get('code');

	if (!code) {
		return NextResponse.redirect(
			`${dynamicBaseURL}/error?message=Missing authorization code`
		);
	}

	try {
		const tokenResponse = await fetch(
			'https://accounts.spotify.com/api/token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64')}`,
				},
				body: new URLSearchParams({
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: redirectUri!,
				}),
			}
		);

		const tokenData = await tokenResponse.json();

		if (!tokenResponse.ok) {
			if (tokenData.error === 'invalid_grant') {
				return NextResponse.redirect(
					`${dynamicBaseURL}/error?message=Authorization expired. Please try again.`
				);
			}
			throw new Error(tokenData.error);
		}

		const albumInfoResponse = await fetch(
			`https://api.spotify.com/v1/albums/${ALBUM_ID}`,
			{
				headers: {
					Authorization: `Bearer ${tokenData.access_token}`,
				},
			}
		);

		if (!albumInfoResponse.ok) {
			throw new Error('Failed to get album information');
		}

		const albumInfo = await albumInfoResponse.json();
		const trackId = albumInfo.tracks.items[0].id;

		const saveTrackResponse = await fetch(
			`https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${tokenData.access_token}`,
					'Content-Type': 'application/json',
				},
			}
		);

		if (!saveTrackResponse.ok) {
			throw new Error('Failed to save track');
		}

		return NextResponse.redirect(`${dynamicBaseURL}/success`);
	} catch (error) {
		console.error('Error:', error);
		return NextResponse.redirect(
			`${dynamicBaseURL}/error?message=${encodeURIComponent(error.message)}`
		);
	}
}
