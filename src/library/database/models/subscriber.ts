import mongoose, { Document, Schema } from 'mongoose'

import { TableNames } from '../tableNames'

export type SubscriptionStatus = 'subscribed' | 'pending'

export interface SubscriberInterface {
  firstName: string
  email: string
  status: SubscriptionStatus
  createdAt: Date
  confirmationToken: string
  unsubscribeToken: string
}

export type PublicSubscriber = Pick<SubscriberInterface, 'firstName' | 'email'>

interface SubscriberDocument extends SubscriberInterface, Document {}

const subscriberSchema = new Schema<SubscriberDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'subscribed'],
      default: 'pending',
    },
    confirmationToken: {
      type: String,
      required: true,
    },
    unsubscribeToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

subscriberSchema.index({ email: 1 })
subscriberSchema.index({ confirmationToken: 1 })

export const Subscriber =
  mongoose.models.subscribers ||
  mongoose.model<SubscriberDocument>('subscribers' as TableNames, subscriberSchema)
