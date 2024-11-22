import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/library/logger'

import { SubscriptionStatus } from '../types'
import { decodeEmail } from '../utilities'
import { tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('x')
    const encodedEmail = searchParams.get('e')

    if (!token || !encodedEmail) {
      logger.error('Missing required params:', {
        token: token ? 'present' : 'missing',
        encodedEmail: encodedEmail ? 'present' : 'missing',
      })
      return NextResponse.json({ error: 'Invalid link' }, { status: 400 })
    }

    const collection = (await mongoClient).db().collection(tableNames.subscriptions)
    const email = decodeEmail(encodedEmail)

    const subscriber = await collection.findOne({
      email,
      confirmationToken: token,
    })

    if (!subscriber) {
      return NextResponse.json({ error: 'Invalid link' }, { status: 404 })
    }

    if (subscriber.status === 'subscribed') {
      return NextResponse.json(
        {
          message: 'Email already confirmed',
          subscriber,
        },
        { status: 200 },
      )
    }

    const result = await collection.findOneAndUpdate(
      {
        email,
        confirmationToken: token,
      },
      {
        $set: {
          status: 'subscribed' as SubscriptionStatus,
        },
      },
      { returnDocument: 'after' },
    )

    return NextResponse.json({
      message: 'Email confirmed successfully',
      subscriber: result,
    })
  } catch (error) {
    logger.error('Failed to confirm subscription:')
    logger.error(error as string)
    return NextResponse.json({ error: 'Failed to confirm subscription' }, { status: 500 })
  }
}
