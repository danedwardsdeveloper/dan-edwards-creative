import { NextRequest, NextResponse } from 'next/server'

import { Subscriber } from '@/library/database/models/subscriber'
import connectDB from '@/library/database/mongoose'
import generateEmailContainer from '@/library/email/htmlComponents/container'
import { generateEmailHyperlink } from '@/library/email/htmlComponents/hyperlink'
import {
  generateConfirmationEmailContent,
  sendConfirmationEmail,
} from '@/library/email/sendConfirmationEmail'
import logger from '@/library/logger'

import { generateConfirmationURL, generateToken, generateUnsubscribeURL } from '../utilities'
import { ApiEndpoints } from '@/types/apiEndpoints'

if (!process.env.MY_EMAIL_ONE) {
  throw new Error('MY_EMAIL_ONE missing')
}

if (!process.env.MY_EMAIL_TWO) {
  throw new Error('MY_EMAIL_TWO missing')
}

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
    logger.debug('Confirmation token:', { confirmationToken })
    logger.debug('Unsubscribe token:', { unsubscribeToken })

    const isAdminEmail =
      sanitizedEmail === process.env.MY_EMAIL_ONE || sanitizedEmail === process.env.MY_EMAIL_TWO

    logger.info('Creating new subscriber...')
    const savedSubscriber = await Subscriber.create({
      firstName: sanitizedFirstName,
      email: sanitizedEmail,
      status: isAdminEmail ? 'pending' : 'subscribed',
      confirmationToken,
      unsubscribeToken,
    })
    logger.info('Subscriber created:', { savedSubscriber })

    if (isAdminEmail) {
      const confirmationURL = generateConfirmationURL(confirmationToken, email)
      logger.info({ confirmationURL }, 'Confirmation URL: ')
      logger.info('Admin email used: attempting to send confirmation email')
      await sendConfirmationEmail(savedSubscriber)
    } else {
      const unsubscribeURL = generateUnsubscribeURL(savedSubscriber.unsubscribeToken, savedSubscriber.email)
      const unsubscribeLink = generateEmailHyperlink(unsubscribeURL, 'Unsubscribe', 'grey')
      const content = generateConfirmationEmailContent(savedSubscriber)
      const htmlContent = generateEmailContainer(content, unsubscribeLink)
      logger.debug('Would have sent this HTML content:', { htmlContent })
      logger.info('Non-admin email: auto-subscribed without confirmation email')
    }

    return NextResponse.json(
      {
        message: 'success please confirm',
        subscriber: savedSubscriber.toObject(),
      },
      { status: 201 },
    )
  } catch (error) {
    logger.error('Failed to add subscription:', { error })
    logger.debug('Error stack trace:', (error as Error).stack)
    return NextResponse.json({ status: 500, message: 'fail' }, { status: 500 })
  }
}
