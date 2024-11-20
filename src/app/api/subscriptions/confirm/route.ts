import { NextRequest, NextResponse } from 'next/server'

import { isDevelopment } from '@/library/environment'
import { logger } from '@/library/logger'

import type { SubscriptionsStatus } from '../route'
import { generateConfirmationLink, generateToken } from '../utilities'
import { tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Confirmation token is required' }, { status: 400 })
    }

    const collection = (await mongoClient).db().collection(tableNames.subscriptions)
    const subscriber = await collection.findOne({ confirmationToken: token })

    if (!subscriber) {
      return NextResponse.json({ error: 'Invalid confirmation token' }, { status: 404 })
    }

    if (subscriber.status === 'subscribed') {
      return NextResponse.json({
        message: 'Email already confirmed',
        subscriber,
      })
    }

    const result = await collection.findOneAndUpdate(
      { confirmationToken: token },
      {
        $set: {
          status: 'subscribed' as SubscriptionsStatus,
          confirmationToken: null,
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

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const collection = (await mongoClient).db().collection(tableNames.subscriptions)
    const subscriber = await collection.findOne({ email })

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 })
    }

    if (subscriber.status === 'subscribed') {
      return NextResponse.json({
        message: 'Email already confirmed',
        subscriber,
      })
    }

    const newConfirmationToken = generateToken()
    await collection.updateOne({ email }, { $set: { confirmationToken: newConfirmationToken } })

    if (isDevelopment) {
      logger.info('New Confirmation Link:')
      logger.info(generateConfirmationLink(newConfirmationToken, email))
    }

    // ToDo
    // Send new confirmation email with newConfirmationToken

    return NextResponse.json({
      message: 'New confirmation email sent',
    })
  } catch (error) {
    logger.error('Failed to resend confirmation:')
    logger.error(error as string)
    return NextResponse.json({ error: 'Failed to resend confirmation' }, { status: 500 })
  }
}
