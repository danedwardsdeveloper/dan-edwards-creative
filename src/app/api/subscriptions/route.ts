import { NextRequest, NextResponse } from 'next/server'

import { isDevelopment } from '@/library/environment'
import { logger } from '@/library/logger'

import { generateConfirmationLink, generateToken } from './utilities'
import { tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

export type SubscriptionsStatus = 'subscribed' | 'unsubscribed' | 'unconfirmed'

export type Subscriber = {
  firstName: string
  email: string
  status: SubscriptionsStatus
  createdAt: Date
  confirmationToken: string | null
  unsubscribeToken: string
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json()
    const collection = (await mongoClient).db().collection(tableNames.subscriptions)
    const existing = await collection.findOne({ email })

    if (existing) {
      if (!existing.confirmed) {
        return NextResponse.json({
          message: 'Please check your email to confirm your subscription',
        })
      }

      if (!existing.subscribed) {
        const result = await collection.findOneAndUpdate(
          { email },
          {
            $set: {
              subscribed: true,
              firstName,
            },
          },
          { returnDocument: 'after' },
        )

        return NextResponse.json({
          message: `Welcome back ${firstName}. You have been resubscribed`,
          subscriber: result,
        })
      }

      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    }

    const confirmationToken = generateToken()
    const unsubscribeToken = generateToken()

    const newSubscriber: Subscriber = {
      firstName,
      email,
      status: 'unconfirmed',
      createdAt: new Date(),
      confirmationToken,
      unsubscribeToken,
    }

    const result = await collection.insertOne(newSubscriber)

    if (isDevelopment) {
      logger.info('Confirmation Link: ')
      logger.info(generateConfirmationLink(confirmationToken, email))
    }

    // ToDo
    // Send confirmation email with confirmationToken

    return NextResponse.json({
      message: `Please check your email to confirm your subscription`,
      subscriber: { ...newSubscriber, _id: result.insertedId },
    })
  } catch (error) {
    console.error('Failed to add subscription:', error)
    return NextResponse.json({ error: 'Failed to add subscription' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const collection = (await mongoClient).db().collection(tableNames.subscriptions)
    const subscribers = await collection.find({ status: 'subscribed' }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error('Failed to fetch subscribers:', error)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}
