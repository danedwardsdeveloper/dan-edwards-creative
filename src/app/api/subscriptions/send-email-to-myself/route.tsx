import { NextRequest, NextResponse } from 'next/server'

import { type SubscriberInterface } from '@/library/database/models/subscriber'
import { sendEmail } from '@/library/email/sendEmail'
import { testEmail, testEmailSubject } from '@/library/email/testEmail'
import { logger } from '@/library/logger'

export async function POST(request: NextRequest) {
  try {
    const subscriber: SubscriberInterface = {
      firstName: 'Dan',
      email: 'danedwardscreative@gmail.com',
      status: 'subscribed',
      createdAt: new Date('2024-11-21T19:57:49.402Z'),
      confirmationToken: '1acfcac5fa49a10983d2',
      unsubscribeToken: '36146950560277d380ad',
    }

    const emailSent = await sendEmail({ subscriber, subject: testEmailSubject, content: testEmail })

    if (!emailSent) {
      logger.error(`Failed to send email to ${subscriber.email}`)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    logger.info(`Successfully sent test email to ${subscriber.email}`)
    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        recipient: subscriber.email,
      },
      { status: 200 },
    )
  } catch (error) {
    logger.error('Error in send-test-email route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
