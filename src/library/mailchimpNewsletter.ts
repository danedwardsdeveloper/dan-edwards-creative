'use server'

import logger from '@/library/logger'

const mailchimpURL = process.env.MAILCHIMP_URL!
const mailchimpApiKey = process.env.MAILCHIMP_API_KEY!

export async function subscribeToNewsletter(email: string, name: string) {
  try {
    if (!email) {
      throw new Error('Email is required')
    }

    const subscriberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name || '',
      },
    }

    logger.info('Attempting to register subscriber with Mailchimp...')
    const response = await fetch(mailchimpURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mailchimpApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Error response from Mailchimp:', data)
      if (data.title === 'Member Exists') {
        throw new Error('This email is already subscribed')
      }
      throw new Error(data.detail || 'Failed to register subscriber')
    }

    logger.info('Mailchimp registration response:', data)

    return 'Successfully subscribed to the newsletter!'
  } catch (error) {
    logger.error('Error registering with Mailchimp:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
    throw error instanceof Error ? error : new Error('An unknown error occurred')
  }
}
