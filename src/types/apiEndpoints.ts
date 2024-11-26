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
      body: PublicSubscriber
      data: {
        message:
          | 'default'
          | 'success confirmation bypassed'
          | 'success please confirm'
          | 'already confirmed'
          | 'already pending'
          | 'email required'
          | 'first name required'
          | 'fail'
        subscriber?: PublicSubscriber
      }
    }
  }
  '/api/subscriptions/unsubscribe': {
    DELETE: {
      params: Record<'x' | 'e', string>
      response: {
        message:
          | 'Invalid link'
          | 'Already unsubscribed'
          | 'Unsubscribed successfully'
          | 'Failed to unsubscribe'
        subscriber?: PublicSubscriber
      }
    }
  }
  '/api/analytics/link-clicks': {
    POST: {
      body: Record<'destination' | 'source', string>
      response: ApiResponse
    }
  }
  '/api/analytics/page-views': {
    POST: {
      body: Record<'page', string>
      response: ApiResponse
    }
  }
}
