import { NextRequest, NextResponse } from 'next/server'

import logger from '@/library/logger'

import { encodeEmail } from '../utilities'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('e')

  if (!email) {
    logger.error(`Missing param: 'e'`)
    return NextResponse.json({ error: `Missing Param: 'e'` }, { status: 400 })
  }

  const encodedEmail = encodeEmail(email)

  return NextResponse.json({ message: `Encoded email: ${encodedEmail}` }, { status: 200 })
}
