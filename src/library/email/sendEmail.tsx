import { SendEmailCommand } from '@aws-sdk/client-ses'

import { sesClient } from '@/library/email/client'
import { logger } from '@/library/logger'

import { type SubscriberInterface } from '../database/models/subscriber'
import generateEmailContainer from './htmlComponents/container'
import { generateUnsubscribeLink } from '@/app/api/subscriptions/utilities'

interface SendEmailProps {
  subscriber: SubscriberInterface
  subject: string
  content: string[]
}

export async function sendEmail({ subscriber, subject, content }: SendEmailProps) {
  const { email, unsubscribeToken } = subscriber
  const unsubscribeLink = generateUnsubscribeLink(unsubscribeToken, email)

  if (!process.env.SES_FROM_EMAIL) {
    throw new Error('SES_FROM_EMAIL environment variable is not set')
  }

  try {
    const htmlContent = generateEmailContainer(content, unsubscribeLink)
    const textContent =
      content.map(item => item.replace(/<[^>]*>/g, '').trim()).join('\n\n') +
      `\n\n--\nDan Edwards creative\nPop music producer & songwriter\ndanedwardscreative.com\n\nUnsubscribe: ${unsubscribeLink}`

    await sesClient.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: subject },
          Body: {
            Html: {
              Data: htmlContent,
              Charset: 'UTF-8',
            },
            Text: {
              Data: textContent,
              Charset: 'UTF-8',
            },
          },
        },
      }),
    )
    logger.info(`Email sent to ${email}`)
    return true
  } catch (error) {
    logger.error('Failed to send email:', error)
    return false
  }
}
