import { SendEmailCommand } from '@aws-sdk/client-ses'

import { logger } from '@/library/logger'

import { generateUnsubscribeLink } from '@/app/api/subscriptions/utilities'
import { fromEmail, sesClient } from '@/email/client'

export default async function sendEmail(email: string, token: string, subject: string, body: string) {
  const unsubscribeLink = generateUnsubscribeLink(token, email)
  try {
    const htmlBody = `
${body}
<br/>
<a href="${unsubscribeLink}" style="color: #6b7280;">Unsubscribe</a>
`

    await sesClient.send(
      new SendEmailCommand({
        Source: fromEmail,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: subject },
          Body: {
            Html: {
              Data: htmlBody,
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
