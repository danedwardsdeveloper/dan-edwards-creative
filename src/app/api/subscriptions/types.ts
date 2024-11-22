export type SubscriptionsStatus = 'subscribed' | 'pending'

export type Subscriber = {
  firstName: string
  email: string
  status: SubscriptionsStatus
  createdAt: Date
  confirmationToken: string
  unsubscribeToken: string
}
