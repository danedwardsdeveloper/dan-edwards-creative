import mongoose, { Document, Schema } from 'mongoose'

import { TableNames } from '../tableNames'

const destinations = {
  SPOTIFY: 'spotify-artist-profile',
  APPLE_MUSIC: 'apple-music-artist-profile',
  YOUTUBE_MUSIC: 'youtube-music-artist-profile',
  INSTAGRAM: 'instagram-profile',
  TWITTER: 'twitter-profile',
  TIKTOK: 'tiktok-profile',
  EMAIL: 'copy-email-address',
  DEVELOPER: 'developer-site',
} as const

export type Destination = (typeof destinations)[keyof typeof destinations]

export interface LinkClickInterface {
  destination: Destination
  localhost: boolean
  clicks: Array<{
    timestamp: Date
    source: string
    admin: boolean
  }>
}

interface LinkClickDocument extends LinkClickInterface, Document {}

const linkClickSchema = new Schema<LinkClickDocument>(
  {
    destination: {
      type: String,
      required: true,
      enum: {
        values: Object.values(destinations),
        message: '{VALUE} is not a valid destination',
      },
    },
    clicks: [
      {
        _id: false,
        timestamp: {
          type: Date,
          required: true,
          default: Date.now,
        },
        source: {
          type: String,
          required: true,
          trim: true,
          validate: {
            validator: (v: string) => v.startsWith('/'),
            message: 'Source must be a valid path starting with /',
          },
        },
        admin: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
  },
  {
    collection: 'link-clicks' as TableNames,
    timestamps: false,
    strict: true,
    strictQuery: true,
  },
)

linkClickSchema.index({ destination: 1 })
linkClickSchema.index({ 'clicks.timestamp': -1 })

export const LinkClickModel =
  (mongoose.models['link-clicks'] as mongoose.Model<LinkClickDocument>) ||
  mongoose.model<LinkClickDocument>('link-clicks' as TableNames, linkClickSchema)
