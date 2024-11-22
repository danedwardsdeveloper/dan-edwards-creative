export type SubscriptionStatus = 'subscribed' | 'pending'

export type Subscriber = {
  firstName: string
  email: string
  status: SubscriptionStatus
  createdAt: Date
  confirmationToken: string
  unsubscribeToken: string
}
