import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

import { tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

const subscriptionsTable = tableNames.subscriptions

type Subscriber = {
  firstName: string
  email: string
  subscribed: boolean
  createdAt: Date
  unsubscribeToken: string
}

function generateUnsubscribeToken(): string {
  return crypto.randomBytes(10).toString('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json()
    const collection = (await mongoClient).db().collection(subscriptionsTable)
    const existing = await collection.findOne({ email })

    if (existing) {
      if (!existing.subscribed) {
        const result = await collection.findOneAndUpdate(
          { email },
          {
            $set: {
              subscribed: true,
              firstName,
            },
          },
          {
            returnDocument: 'after',
          },
        )

        if (!result) {
          return NextResponse.json({ error: 'Failed to resubscribe' }, { status: 500 })
        }

        return NextResponse.json({
          message: `Welcome back ${firstName}. You have been resubscribed`,
          subscriber: result,
        })
      }

      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    }

    const unsubscribeToken = generateUnsubscribeToken()
    const newSubscriber: Subscriber = {
      firstName,
      email,
      subscribed: true,
      createdAt: new Date(),
      unsubscribeToken,
    }

    const result = await collection.insertOne(newSubscriber)

    return NextResponse.json({
      message: `Welcome ${firstName}. Subscription successful`,
      subscriber: { ...newSubscriber, _id: result.insertedId },
    })
  } catch (error) {
    console.error('Failed to add subscription:', error)
    return NextResponse.json({ error: 'Failed to add subscription' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const collection = (await mongoClient).db().collection(subscriptionsTable)
    const subscribers = await collection.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error('Failed to fetch subscribers:', error)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Unsubscribe token is required' }, { status: 400 })
    }

    const collection = (await mongoClient).db().collection(subscriptionsTable)
    const existingSubscriber = await collection.findOne({ unsubscribeToken: token })

    if (!existingSubscriber) {
      return NextResponse.json({ error: 'Invalid unsubscribe token' }, { status: 404 })
    }

    if (!existingSubscriber.subscribed) {
      return NextResponse.json({
        message: `${existingSubscriber.email} already unsubscribed`,
        subscriber: existingSubscriber,
      })
    }

    await collection.updateOne({ unsubscribeToken: token }, { $set: { subscribed: false } })

    const updatedSubscriber = await collection.findOne({ unsubscribeToken: token })

    return NextResponse.json({
      message: `${existingSubscriber.email} unsubscribed`,
      subscriber: updatedSubscriber,
    })
  } catch (error) {
    console.error('Failed to update subscription:', error)
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
  }
}
