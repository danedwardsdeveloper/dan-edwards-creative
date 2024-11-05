import { spotifyRedirectUri } from '@/library/environment'
import { NextResponse } from 'next/server'

export async function GET() {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
  const scope = 'user-library-modify user-library-read'
  const state = Math.random().toString(36).substring(7)

  const authUrl = new URL('https://accounts.spotify.com/authorize')
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('client_id', spotifyClientId!)
  authUrl.searchParams.append('scope', scope)
  authUrl.searchParams.append('redirect_uri', spotifyRedirectUri)
  authUrl.searchParams.append('state', state)

  return NextResponse.json({ url: authUrl.toString() })
}
