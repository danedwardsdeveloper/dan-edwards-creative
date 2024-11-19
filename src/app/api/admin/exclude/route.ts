import { NextRequest, NextResponse } from 'next/server'

import { createCookieOptions, generateTokenPayload } from '@/library/cookies'

if (!process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD missing')
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const password = searchParams.get('password')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return new NextResponse('Unauthorized', {
      status: 401,
    })
  }

  const tokenPayload = generateTokenPayload('admin')
  const response = NextResponse.json({ status: 'success' })
  const cookieOptions = createCookieOptions(JSON.stringify(tokenPayload))
  response.cookies.set(cookieOptions)
  return response
}
