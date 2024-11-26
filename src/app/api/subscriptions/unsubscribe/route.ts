import { NextRequest, NextResponse } from 'next/server'

import { Subscriber } from '@/library/database/models/subscriber'
import connectDB from '@/library/database/mongoose'
import { logger } from '@/library/logger'

import { decodeEmail } from '../utilities'
import { ApiEndpoints } from '@/types/apiEndpoints'

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<ApiEndpoints['/api/subscriptions/unsubscribe']['DELETE']['response']>> {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const typesafeParams = Object.fromEntries(
      searchParams.entries(),
    ) as ApiEndpoints['/api/subscriptions/unsubscribe']['DELETE']['params']
    const unsubscribeToken = typesafeParams.x
    const encodedEmail = typesafeParams.e

    if (!unsubscribeToken) {
      logger.error(`Missing param: 'x'`)
      return NextResponse.json({ message: 'Invalid link' }, { status: 400 })
    }

    if (!encodedEmail) {
      logger.error(`Missing param: 'e'`)
      return NextResponse.json({ message: 'Invalid link' }, { status: 400 })
    }

    const email = decodeEmail(encodedEmail)

    const subscriber = await Subscriber.findOne({
      $or: [{ email }, { unsubscribeToken }],
    })

    if (!subscriber) {
      return NextResponse.json(
        {
          message: 'User already unsubscribed',
        },
        { status: 404 },
      )
    }

    if (subscriber.unsubscribeToken !== unsubscribeToken || subscriber.email !== email) {
      return NextResponse.json({ message: 'Invalid link' }, { status: 400 })
    }

    await Subscriber.deleteOne({
      email,
      unsubscribeToken,
    })

    return NextResponse.json({
      message: `${email} unsubscribed successfully`,
    })
  } catch (error) {
    logger.error('Failed to unsubscribe:', error instanceof Error ? error.message : String(error))
    return NextResponse.json({ message: 'Failed to unsubscribe' }, { status: 500 })
  }
}
