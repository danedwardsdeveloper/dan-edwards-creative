import { type SubscriberInterface } from '../database/models/subscriber'
import { sendEmail } from './sendEmail'

export async function sendConfirmationEmail(subscriber: SubscriberInterface) {
  const content = [
    `<p>Hey there${subscriber.firstName && `, ${subscriber.firstName}`}</p>`,
    `<p>Please confirm your subscription:</p>`,
    `<p>If you didn't request this subscription, you can safely ignore this email.</p>`,
  ]

  return sendEmail({
    subscriber,
    subject: 'Confirm newsletter subscription',
    content,
  })
}
