import { NextRequest, NextResponse } from 'next/server'
import { dynamicBaseURL, spotifyRedirectUri } from '@/library/environment'
import { SpotifyErrorResponse, SpotifySuccessResponse } from '@/types/spotify'

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET
// const trackId = '1j4w9XSeU99nAtmZSKOMXh'
const trackId = '2O77JGO2Qhrr2q1b23X5wi'

async function recordPreSaveAttempt(
  status: 'success' | 'failure',
  spotifyResponse?: SpotifyErrorResponse | SpotifySuccessResponse,
  error?: string,
) {
  try {
    const url = new URL('/api/analytics/pre-saves', dynamicBaseURL).toString()

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        trackId,
        ...(error && { error }),
        ...(spotifyResponse && { spotifyResponse }),
      }),
    })
  } catch (e) {
    console.error('Failed to record pre-save attempt:', e)
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    await recordPreSaveAttempt(
      'failure',
      undefined,
      'Missing authorization code',
    )
    return NextResponse.redirect(
      `${dynamicBaseURL}/error?message=Missing authorization code`,
    )
  }

  try {
    const tokenResponse = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${spotifyClientId}:${spotifyClientSecret}`,
          ).toString('base64')}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: spotifyRedirectUri,
        }),
      },
    )

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      const error =
        tokenData.error === 'invalid_grant'
          ? 'Authorization expired. Please try again.'
          : tokenData.error_description || tokenData.error

      await recordPreSaveAttempt('failure', undefined, error)

      return NextResponse.redirect(
        `${dynamicBaseURL}/error?message=${encodeURIComponent(error)}`,
      )
    }

    const saveResponse = await fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: [trackId],
      }),
    })

    const responseText = await saveResponse.text()
    const spotifyResponse = {
      status: saveResponse.status,
      statusText: saveResponse.statusText,
      response: responseText || 'No response body',
    }

    if (!saveResponse.ok) {
      await recordPreSaveAttempt(
        'failure',
        spotifyResponse,
        'Failed to save track',
      )
      throw new Error('Failed to save track')
    }

    await recordPreSaveAttempt('success', spotifyResponse)
    return NextResponse.redirect(`${dynamicBaseURL}/success`)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred'

    await recordPreSaveAttempt('failure', undefined, errorMessage)

    return NextResponse.redirect(
      `${dynamicBaseURL}/error?message=${encodeURIComponent(errorMessage)}`,
    )
  }
}
