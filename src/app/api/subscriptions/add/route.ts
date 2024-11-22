import { NextRequest, NextResponse } from 'next/server'

import { isDevelopment } from '@/library/environment'
import { logger } from '@/library/logger'

import { sendConfirmationEmail } from '../emailTemplates'
import { Subscriber, SubscriptionsStatus } from '../types'
import { generateConfirmationLink, generateToken } from '../utilities'
import { tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    if (!firstName) {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }

    let collection
    try {
      collection = (await mongoClient).db().collection(tableNames.subscriptions)
    } catch (error) {
      logger.error('Database connection failed:', error)
      return NextResponse.json({ error: 'Database connection failed' }, { status: 503 })
    }

    const existing = await collection.findOne({ email })

    if (existing) {
      if (existing.status === 'pending' && isDevelopment) {
        return NextResponse.json(
          {
            message: 'Please check your email to confirm your subscription',
            status: 'pending' as SubscriptionsStatus,
          },
          { status: 202 },
        )
      }

      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    }

    const confirmationToken = generateToken()
    const unsubscribeToken = generateToken()

    const newSubscriber: Subscriber = {
      firstName,
      email,
      status: isDevelopment ? 'pending' : 'subscribed',
      createdAt: new Date(),
      confirmationToken,
      unsubscribeToken,
    }

    const result = await collection.insertOne(newSubscriber)

    if (isDevelopment) {
      const confirmationLink = generateConfirmationLink(confirmationToken, email)
      logger.info('Confirmation Link: ', confirmationLink)

      const sendActualEmails = true

      if (sendActualEmails) {
        await sendConfirmationEmail(email, firstName, confirmationLink)
      } else {
        logger.info('Sending actual emails turned off')
      }

      return NextResponse.json(
        {
          message: `Please check your email to confirm your subscription`,
          subscriber: { ...newSubscriber, _id: result.insertedId },
        },
        { status: 201 },
      )
    } else {
      return NextResponse.json(
        {
          message: `Thank you for subscribing to our newsletter!`,
          subscriber: { ...newSubscriber, _id: result.insertedId },
        },
        { status: 201 },
      )
    }
  } catch (error) {
    console.error('Failed to add subscription:', error)
    return NextResponse.json({ error: 'Failed to add subscription' }, { status: 500 })
  }
}
