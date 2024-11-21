import { Document } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { validateRequestIp } from '@/library/validateIp'

import { databaseNames, tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

export type Destination =
  | 'spotify-artist-profile'
  | 'apple-music-artist-profile'
  | 'youtube-music-artist-profile'
  | 'instagram-profile'
  | 'twitter-profile'
  | 'tiktok-profile'
  | 'copy-email-address'

interface ClickRecord {
  timestamp: Date
  source: string
}

interface LinkClicksData {
  destination: Destination
  totalClicks: number
  clicks: ClickRecord[]
}
export async function POST(request: NextRequest) {
  try {
    const ipValidation = validateRequestIp(request)
    if (!ipValidation.isValid) {
      return ipValidation.response
    }

    const body: { destination: Destination; source: string } = await request.json()
    const { destination, source } = body

    if (!destination || !source) {
      return NextResponse.json({ error: 'Destination and source are required' }, { status: 400 })
    }

    const client = await mongoClient
    const db = client.db(databaseNames)
    const collection = db.collection<LinkClicksData>(tableNames.linkClicks)

    const click: ClickRecord = {
      timestamp: new Date(),
      source,
    }

    await collection.updateOne(
      { destination },
      {
        $inc: { totalClicks: 1 },
        $push: {
          clicks: {
            $each: [click],
            $position: 0,
          },
        },
      } as Document,
      { upsert: true },
    )

    return NextResponse.json({
      message: 'Link click recorded successfully',
      destination,
    })
  } catch (error) {
    console.error('Error recording link click:', error)
    return NextResponse.json({ error: 'Failed to record link click' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const client = await mongoClient
    const db = client.db(databaseNames)
    const collection = db.collection<LinkClicksData>(tableNames.linkClicks)

    const stats = await collection.find().toArray()
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching link click stats:', error)
    return NextResponse.json({ error: 'Failed to fetch link click statistics' }, { status: 500 })
  }
}
