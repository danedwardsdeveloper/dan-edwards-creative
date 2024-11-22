import { NextResponse } from 'next/server'

import { tableNames } from '@/database/configuration'
import mongoClient from '@/database/mongodb'

// ToDo
// Require password!

export async function GET() {
  try {
    const collection = (await mongoClient).db().collection(tableNames.subscriptions)
    const subscribers = await collection.find({ status: 'subscribed' }).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error('Failed to fetch subscribers:', error)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}
