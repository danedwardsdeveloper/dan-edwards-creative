import { NextRequest, NextResponse } from 'next/server'

import { Subscriber } from '@/library/database/models/subscriber'
import connectDB from '@/library/database/mongoose'
import { logger } from '@/library/logger'

import { decodeEmail, generateUnsubscribeLink } from '../utilities'
import { ApiEndpoints } from '@/types/apiEndpoints'

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<ApiEndpoints['/api/subscriptions/confirm']['PATCH']['data']>> {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const typesafeParams = Object.fromEntries(
      searchParams.entries(),
    ) as ApiEndpoints['/api/subscriptions/confirm']['PATCH']['params']

    const confirmationToken = typesafeParams.x
    const encodedEmail = typesafeParams.e

    if (!confirmationToken) {
      logger.error(`Missing param: 'x'`)
      return NextResponse.json(
        {
          status: 400,
          message: `Missing param: 'x'`,
        },
        { status: 400 },
      )
    }

    if (!encodedEmail) {
      logger.error(`Missing param: 'e'`)
      return NextResponse.json({ status: 400, message: `Missing param: 'e'` }, { status: 400 })
    }

    const email = decodeEmail(encodedEmail)

    const subscriber = await Subscriber.findOne({
      email,
      confirmationToken,
    }).select('firstName email status')

    if (!subscriber) {
      return NextResponse.json({ status: 404, message: 'Subscriber not found' }, { status: 404 })
    }

    if (subscriber.status === 'subscribed') {
      return NextResponse.json(
        {
          status: 409,
          message: 'Email already confirmed',
          subscriber: {
            firstName: subscriber.firstName,
            email: subscriber.email,
          },
        },
        { status: 409 },
      )
    }

    const result = await Subscriber.findOneAndUpdate(
      {
        email,
        confirmationToken,
      },
      {
        $set: {
          status: 'subscribed',
        },
      },
      {
        new: true,
        select: 'firstName email unsubscribeToken',
      },
    )

    logger.info('Unsubscribe Link:', generateUnsubscribeLink(result.unsubscribeToken, email))

    return NextResponse.json(
      {
        status: 200,
        message: 'Email confirmed successfully',
        subscriber: {
          firstName: result.firstName,
          email: result.email,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    logger.error('Failed to confirm subscription:')
    logger.error(error as string)
    return NextResponse.json({ status: 500, message: 'Failed to confirm subscription' }, { status: 500 })
  }
}
