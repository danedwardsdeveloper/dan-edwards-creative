import { type SubscriberInterface } from '../database/models/subscriber'
import { generateEmailHyperlink } from './htmlComponents/hyperlink'
import { sendEmail } from './sendEmail'
import { generateConfirmationURL } from '@/app/api/subscriptions/utilities'

export function generateConfirmationEmailContent(subscriber: SubscriberInterface) {
  const confirmationURL = generateConfirmationURL(subscriber.confirmationToken, subscriber.email)
  const confirmationLink = generateEmailHyperlink(confirmationURL, 'Confirm subscription', 'blue')

  const content = [
    `<p>Hey there${subscriber.firstName && `, ${subscriber.firstName}`}</p>`,
    `<p>Please confirm your subscription:</p>`,
    confirmationLink,
    `<p>If you didn't request this subscription, you can safely ignore this email.</p>`,
  ]
  return content
}

export async function sendConfirmationEmail(subscriber: SubscriberInterface) {
  const content = generateConfirmationEmailContent(subscriber)

  return sendEmail({
    subscriber,
    subject: 'Confirm newsletter subscription',
    content,
  })
}
