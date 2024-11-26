import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/library/logger'

import { encodeEmail } from '../utilities'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const plainEmail = searchParams.get('e')

  if (!plainEmail) {
    logger.error(`Missing param: 'e'`)
    return NextResponse.json({ error: `Missing Param: 'e'` }, { status: 400 })
  }

  const encodedEmail = encodeEmail(plainEmail)

  return NextResponse.json({ message: `Encoded email: ${encodedEmail}` }, { status: 200 })
}
