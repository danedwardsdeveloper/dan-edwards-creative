import { NextRequest, NextResponse } from 'next/server'

import { createCookieOptions, generateTokenPayload } from '@/library/cookies'

import { type ApiEndpoints } from '@/types/apiEndpoints'

if (!process.env.ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD missing')
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiEndpoints['/api/admin-exclude']['GET']['response']>> {
  const searchParams = new URLSearchParams(request.nextUrl.search)
  const password = searchParams.get('p') as ApiEndpoints['/api/admin-exclude']['GET']['params']['p']

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  const tokenPayload = generateTokenPayload('admin')
  const cookieOptions = createCookieOptions(JSON.stringify(tokenPayload))

  const response = NextResponse.json({
    message: 'success',
    success: true,
    status: 200,
  })

  response.cookies.set(cookieOptions)
  return response
}
