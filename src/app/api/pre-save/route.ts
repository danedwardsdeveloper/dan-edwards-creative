import { NextRequest, NextResponse } from 'next/server'
import mongoClient from '@/library/mongodb'
import { Document } from 'mongodb'

interface PreSaveInteraction {
  timestamp: Date
  status: 'success' | 'failure'
  error?: string
  trackId: string
  spotifyResponse?: {
    status: number
    statusText: string
    response: string
  }
}

export interface PreSaveData {
  trackId: string
  successful: number
  failed: number
  interactions: PreSaveInteraction[]
}

export async function POST(request: NextRequest) {
  try {
    const body: {
      status: 'success' | 'failure'
      trackId: string
      error?: string
      spotifyResponse?: {
        status: number
        statusText: string
        response: string
      }
    } = await request.json()

    const { status, trackId, error, spotifyResponse } = body

    if (!status || !trackId) {
      return NextResponse.json(
        { error: 'Status and trackId are required' },
        { status: 400 },
      )
    }

    const client = await mongoClient
    const db = client.db('dan-edwards-creative')
    const collection = db.collection<PreSaveData>('pre-save')

    // const ip = request.ip || request.headers.get('x-forwarded-for') || '0.0.0.0'

    // if (ip === '::1' || ip === '127.0.0.1') {
    //   return NextResponse.json({ message: 'Ignored localhost attempt' })
    // }

    const interaction: PreSaveInteraction = {
      timestamp: new Date(),
      status,
      trackId,
      ...(error && { error }),
      ...(spotifyResponse && { spotifyResponse }),
    }

    // Update the document with new totals and add the interaction
    await collection.updateOne(
      { trackId },
      {
        $inc: {
          successful: status === 'success' ? 1 : 0,
          failed: status === 'failure' ? 1 : 0,
        },
        $push: {
          interactions: {
            $each: [interaction],
            $position: 0, // Add new interactions at the start of the array
          },
        },
      } as Document,
      { upsert: true },
    )

    return NextResponse.json({
      message: 'Pre-save attempt recorded successfully',
      status,
      trackId,
    })
  } catch (error) {
    console.error('Error recording pre-save attempt:', error)
    return NextResponse.json(
      { error: 'Failed to record pre-save attempt' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const client = await mongoClient
    const db = client.db('dan-edwards-creative')
    const collection = db.collection<PreSaveData>('pre-save')

    const stats = await collection.find().toArray()

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching pre-save stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pre-save statistics' },
      { status: 500 },
    )
  }
}
