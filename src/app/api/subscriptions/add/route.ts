import { NextRequest, NextResponse } from 'next/server'

import { Subscriber } from '@/library/database/models/subscriber'
import connectDB from '@/library/database/mongoose'
import generateEmailContainer from '@/library/email/htmlComponents/container'
import {
  generateConfirmationEmailContent,
  sendConfirmationEmail,
} from '@/library/email/sendConfirmationEmail'
import { isDevelopment } from '@/library/environment'
import { logger } from '@/library/logger'

import { generateConfirmationLink, generateToken, generateUnsubscribeLink } from '../utilities'
import { ApiEndpoints } from '@/types/apiEndpoints'

const sendActualEmails = false

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiEndpoints['/api/subscriptions/add']['POST']['data']>> {
  try {
    await connectDB()

    const { email, firstName } =
      (await request.json()) as ApiEndpoints['/api/subscriptions/add']['POST']['body']

    if (!email || typeof email !== 'string' || !email.trim()) {
      logger.info('Invalid or missing email')
      return NextResponse.json({ message: 'email required' }, { status: 400 })
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      logger.info('Invalid or missing first name')
      return NextResponse.json({ message: 'first name required' }, { status: 400 })
    }

    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedFirstName = firstName.trim()

    const existing = await Subscriber.findOne({ email: sanitizedEmail })

    if (existing && existing.status === 'pending') {
      logger.info('Found pending subscription')
      return NextResponse.json(
        {
          message: 'already pending',
        },
        { status: 202 },
      )
    }

    if (existing && existing.status === 'subscribed') {
      logger.info('Found confirmed subscription')
      return NextResponse.json(
        {
          message: 'already confirmed',
          subscriber: existing.toObject(),
        },
        { status: 200 },
      )
    }

    const confirmationToken = generateToken()
    const unsubscribeToken = generateToken()
    logger.debug('Confirmation token:', confirmationToken)
    logger.debug('Unsubscribe token:', unsubscribeToken)

    logger.info('Creating new subscriber...')
    const savedSubscriber = await Subscriber.create({
      firstName: sanitizedFirstName,
      email: sanitizedEmail,
      status: isDevelopment ? 'pending' : 'subscribed',
      confirmationToken,
      unsubscribeToken,
    })
    logger.info('Subscriber created:', savedSubscriber)

    if (isDevelopment) {
      const confirmationLink = generateConfirmationLink(confirmationToken, email)
      logger.info('Confirmation link: ', confirmationLink)

      if (sendActualEmails) {
        await sendConfirmationEmail(savedSubscriber)
      } else {
        const unsubscribeLink = generateUnsubscribeLink(
          savedSubscriber.unsubscribeToken,
          savedSubscriber.email,
        )
        const content = generateConfirmationEmailContent(savedSubscriber)

        const htmlContent = generateEmailContainer(content, unsubscribeLink)
        logger.debug('HTML content:', htmlContent)
        logger.info('Sending actual emails disabled')
      }

      return NextResponse.json(
        {
          message: 'success please confirm',
          subscriber: savedSubscriber.toObject(),
        },
        { status: 201 },
      )
    } else {
      return NextResponse.json(
        {
          message: 'success please confirm',
          subscriber: savedSubscriber.toObject(),
        },
        { status: 201 },
      )
    }
  } catch (error) {
    logger.error('Failed to add subscription:', error)
    logger.debug('Error stack trace:', (error as Error).stack)
    return NextResponse.json({ status: 500, message: 'fail' }, { status: 500 })
  }
}
