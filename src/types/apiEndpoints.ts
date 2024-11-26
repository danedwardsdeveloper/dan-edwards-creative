import { PublicSubscriber } from '@/library/database/models/subscriber'

interface ApiResponse {
  message: string
  subscriber?: PublicSubscriber
}

export interface ApiEndpoints {
  '/api/admin-exclude': {
    GET: {
      params: Record<'p', string>
      response: ApiResponse
    }
  }
  '/api/subscriptions/confirm': {
    PATCH: {
      params: Record<'x' | 'e', string>
      data: {
        status: 404 | 400 | 409 | 200 | 500
        message:
          | 'Email already confirmed'
          | `Missing param: 'x'`
          | `Missing param: 'e'`
          | 'Subscriber not found'
          | 'Email confirmed successfully'
          | 'Failed to confirm subscription'
        subscriber?: PublicSubscriber
      }
    }
  }
  '/api/subscriptions/add': {
    POST: {
      body: Record<'email' | 'firstName', string>
      response: {
        message:
          | 'Please check your email to confirm your subscription'
          | 'Thank you for subscribing to my newsletter'
          | 'Email already subscribed'
          | 'First name is required'
          | 'Email is required'
          | 'Failed to add subscription'
        subscriber?: PublicSubscriber
      }
    }
  }
  '/api/subscriptions/unsubscribe': {
    DELETE: {
      params: Record<'x' | 'e', string>
      response: ApiResponse
    }
  }
  '/api/analytics/link-clicks': {
    POST: {}
  }
}

export type ApiPath = keyof ApiEndpoints
