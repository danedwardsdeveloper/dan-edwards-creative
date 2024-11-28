import { NextRequest, NextResponse } from 'next/server'

import { LinkClickModel } from '@/library/database/models/linkClick'
import connectDB from '@/library/database/mongoose'
import { isDevelopment } from '@/library/environment'
import { readIpAddress } from '@/library/ipAddress'
import logger from '@/library/logger'

import { ApiEndpoints } from '@/types/apiEndpoints'

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiEndpoints['/api/analytics/link-clicks']['POST']['response']>> {
  try {
    await connectDB()

    const ipAddress = readIpAddress(request)
    const isAdmin = ipAddress.admin || isDevelopment

    let body: { destination?: string; source?: string }

    try {
      body = await request.json()
    } catch (error) {
      logger.error('Invalid JSON in request body', { error })
      return NextResponse.json({ message: 'click failed' }, { status: 400 })
    }

    const { destination, source } = body as ApiEndpoints['/api/analytics/link-clicks']['POST']['body']

    if (!destination) {
      logger.info('Destination required in request body')
      return NextResponse.json({ message: 'destination required' }, { status: 400 })
    }

    if (!source) {
      logger.info('Source required in request body')
      return NextResponse.json({ message: 'source required' }, { status: 400 })
    }

    logger.debug('Processing link click', { destination, source })

    try {
      const result = await LinkClickModel.findOneAndUpdate(
        { destination },
        {
          $setOnInsert: {
            destination,
          },
          $push: {
            clicks: {
              $each: [
                {
                  timestamp: new Date(),
                  source,
                  admin: isAdmin,
                },
              ],
              $position: 0,
            },
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        },
      )

      logger.info('Link click recorded successfully', {
        destination,
        source,
        documentId: result._id,
        isAdmin,
      })

      return NextResponse.json(
        {
          message: isAdmin ? 'admin click recorded' : 'click recorded',
        },
        { status: 200 },
      )
    } catch (error) {
      logger.error('Error recording click to database:', error)
      return NextResponse.json({ message: isAdmin ? 'admin click failed' : 'click failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error processing link click request:', error)
    return NextResponse.json({ message: 'click failed' }, { status: 500 })
  }
}
