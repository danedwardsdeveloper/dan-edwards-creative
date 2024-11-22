import { NextRequest } from 'next/server'

import { logger } from '@/library/logger'

import { generateUnsubscribeLink } from '@/app/api/subscriptions/utilities'
import sendEmail from '@/email/sendEmail'

const email = ''
const unsubscribeToken = ''
const subject = ''
const body = ''

export async function POST(request: NextRequest) {
  const unsubscribeLink = generateUnsubscribeLink(email, unsubscribeToken)
  try {
    await sendEmail(email, unsubscribeLink, subject, body)
  } catch {
    logger.info('Failed to send test email')
  }
}
