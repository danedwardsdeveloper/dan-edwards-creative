import { NextRequest, NextResponse } from 'next/server'

interface ValidationResult {
  admin: boolean
  country: 'unknown'
  response?: NextResponse
}

export function readIpAddress(request: NextRequest): ValidationResult {
  const ip =
    request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0] || '0.0.0.0'

  if (ip === '::1' || ip === '127.0.0.1') {
    return {
      admin: true,
      country: 'unknown',
      response: NextResponse.json({}),
    }
  }

  return { admin: false, country: 'unknown' }
}
