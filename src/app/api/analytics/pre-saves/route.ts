import { NextRequest, NextResponse } from 'next/server'
import mongoClient, { databaseName, tableNames } from '@/library/mongodb'
import { Document } from 'mongodb'
import { validateRequestIp } from '@/library/ipValidation'

interface SpotifyResponse {
  status: number
  statusText: string
  response: string
}

interface PreSaveRequest {
  status: 'success' | 'failure'
  trackId: string
  error?: string
  spotifyResponse?: SpotifyResponse
}

interface PreSaveInteraction extends PreSaveRequest {
  timestamp: Date
}

interface PreSaveRecord {
  trackId: string
  successful: number
  failed: number
  interactions: PreSaveInteraction[]
}

async function recordPreSaveInteraction(
  trackId: string,
  interaction: PreSaveInteraction,
) {
  const client = await mongoClient
  const collection = client
    .db(databaseName)
    .collection<PreSaveRecord>(tableNames.preSaves)

  await collection.updateOne(
    { trackId },
    {
      $inc: {
        successful: interaction.status === 'success' ? 1 : 0,
        failed: interaction.status === 'failure' ? 1 : 0,
      },
      $push: {
        interactions: {
          $each: [interaction],
          $position: 0,
        },
      },
    } as Document,
    { upsert: true },
  )
}

export async function POST(request: NextRequest) {
  try {
    const ipValidation = validateRequestIp(request)
    if (!ipValidation.isValid) {
      return ipValidation.response
    }

    const body: PreSaveRequest = await request.json()
    const { status, trackId, error, spotifyResponse } = body

    if (!status || !trackId) {
      return NextResponse.json(
        { error: 'Status and trackId are required' },
        { status: 400 },
      )
    }

    const interaction: PreSaveInteraction = {
      timestamp: new Date(),
      status,
      trackId,
      ...(error && { error }),
      ...(spotifyResponse && { spotifyResponse }),
    }

    await recordPreSaveInteraction(trackId, interaction)

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

export async function GET(request: NextRequest) {
  try {
    const ipValidation = validateRequestIp(request)
    if (!ipValidation.isValid) {
      return ipValidation.response
    }

    const client = await mongoClient
    const collection = client
      .db(databaseName)
      .collection<PreSaveRecord>(tableNames.preSaves)

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
