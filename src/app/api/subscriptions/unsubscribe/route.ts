import { NextRequest, NextResponse } from 'next/server'

import { logger } from '@/library/logger'

import type { SubscriptionsStatus } from '../route'
import { tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Unsubscribe token is required' }, { status: 400 })
    }

    const collection = (await mongoClient).db().collection(tableNames.subscriptions)
    const subscriber = await collection.findOne({ unsubscribeToken: token })

    if (!subscriber) {
      return NextResponse.json({ error: 'Invalid unsubscribe token' }, { status: 404 })
    }

    if (subscriber.status === 'unsubscribed') {
      return NextResponse.json({
        message: `${subscriber.email} already unsubscribed`,
        subscriber,
      })
    }

    const result = await collection.findOneAndUpdate(
      { unsubscribeToken: token },
      { $set: { status: 'unsubscribed' as SubscriptionsStatus } },
      { returnDocument: 'after' },
    )

    return NextResponse.json({
      message: `${subscriber.email} unsubscribed successfully`,
      subscriber: result,
    })
  } catch (error) {
    logger.error('Failed to unsubscribe:')
    logger.error(error as string)
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
