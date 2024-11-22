import { SendEmailCommand } from '@aws-sdk/client-ses'

import { logger } from '@/library/logger'

import { sesClient } from '@/email/client'

export default async function sendConfirmationEmail(
  email: string,
  firstName: string,
  confirmationLink: string,
) {
  if (!process.env.SES_FROM_EMAIL) {
    throw new Error('SES_FROM_EMAIL environment variable is not set')
  }

  try {
    await sesClient.send(
      new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: 'Confirm newsletter subscription' },
          Body: {
            Html: {
              Data: `
               <h2>Hey, ${firstName}</h2>
               <p>Please click the link below to confirm your subscription:</p>
               <p><a href="${confirmationLink}">Confirm Subscription</a></p>
               <p>If you didn't request this subscription, you can safely ignore this email.</p>
             `,
            },
          },
        },
      }),
    )
    logger.info(`Confirmation email sent to ${email}`)
    return true
  } catch (error) {
    logger.error('Failed to send confirmation email:', error)
    return false
  }
}
