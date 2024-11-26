import { NextRequest, NextResponse } from 'next/server'

import { Subscriber, type SubscriptionStatus } from '@/library/database/models/subscriber'
import connectDB from '@/library/database/mongoose'
import { sendConfirmationEmail } from '@/library/email/sendConfirmationEmail'
import { isDevelopment } from '@/library/environment'
import { logger } from '@/library/logger'

import { generateConfirmationLink, generateToken } from '../utilities'
import { ApiEndpoints } from '@/types/apiEndpoints'

const sendActualEmails = true

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiEndpoints['/api/subscriptions/add']['POST']['response']>> {
  try {
    await connectDB()

    const { email, firstName } =
      (await request.json()) as ApiEndpoints['/api/subscriptions/add']['POST']['body']

    if (!email) {
      return NextResponse.json({ status: 400, message: 'Email is required' }, { status: 400 })
    }

    if (!firstName) {
      return NextResponse.json({ message: 'First name is required' }, { status: 400 })
    }

    const existing = await Subscriber.findOne({ email })

    if (existing) {
      if (existing.status === 'pending' && isDevelopment) {
        return NextResponse.json(
          {
            message: 'Please check your email to confirm your subscription',
            status: 'pending' as SubscriptionStatus,
          },
          { status: 202 },
        )
      }

      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 })
    }

    const confirmationToken = generateToken()
    const unsubscribeToken = generateToken()

    const savedSubscriber = await Subscriber.create({
      firstName,
      email,
      status: isDevelopment ? 'pending' : 'subscribed',
      confirmationToken,
      unsubscribeToken,
    })

    if (isDevelopment) {
      const confirmationLink = generateConfirmationLink(confirmationToken, email)
      logger.info('Confirmation link: ', confirmationLink)

      if (sendActualEmails) {
        await sendConfirmationEmail(savedSubscriber)
      } else {
        logger.info('Sending actual emails disabled')
      }

      return NextResponse.json(
        {
          status: 201,
          message: `Please check your email to confirm your subscription`,
          subscriber: savedSubscriber.toObject(),
        },
        { status: 201 },
      )
    } else {
      return NextResponse.json(
        {
          message: 'Thank you for subscribing to my newsletter',
          subscriber: savedSubscriber.toObject(),
        },
        { status: 201 },
      )
    }
  } catch (error) {
    logger.error('Failed to add subscription:', error)
    return NextResponse.json({ status: 500, message: 'Failed to add subscription' }, { status: 500 })
  }
}
