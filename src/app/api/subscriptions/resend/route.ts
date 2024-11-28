import { NextRequest, NextResponse } from 'next/server'

import mongoClient from '@/library/database/mongodb'
import { type TableNames } from '@/library/database/tableNames'
import { isDevelopment } from '@/library/environment'
import logger from '@/library/logger'

import { generateConfirmationURL, generateToken } from '../utilities'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const collection = (await mongoClient).db().collection('subscribers' as TableNames)
    const subscriber = await collection.findOne({ email })

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 })
    }

    if (subscriber.status === 'subscribed') {
      return NextResponse.json({
        message: 'Email already confirmed',
        subscriber,
      })
    }

    const newConfirmationToken = generateToken()
    await collection.updateOne({ email }, { $set: { confirmationToken: newConfirmationToken } })

    if (isDevelopment) {
      logger.info('New Confirmation Link:')
      logger.info(generateConfirmationURL(newConfirmationToken, email))
    }

    // ToDo
    // Send new confirmation email with newConfirmationToken

    return NextResponse.json({
      message: 'New confirmation email sent',
    })
  } catch (error) {
    logger.error('Failed to resend confirmation:')
    logger.error(error as string)
    return NextResponse.json({ error: 'Failed to resend confirmation' }, { status: 500 })
  }
}
