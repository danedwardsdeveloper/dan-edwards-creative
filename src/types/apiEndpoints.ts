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

export type ApiPath<P extends keyof ApiEndpoints> = P
export type ApiMethod<P extends keyof ApiEndpoints> = keyof ApiEndpoints[P]

type TypesafeApiRequest<P extends keyof ApiEndpoints, M extends keyof ApiEndpoints[P]> = {
  path: P
  method: M
  body?: ApiEndpoints[P][M] extends { body: infer B } ? B : never
  params?: ApiEndpoints[P][M] extends { params: infer ParamType } ? ParamType : never
}

type TypesafeApiResponse<
  P extends keyof ApiEndpoints,
  M extends keyof ApiEndpoints[P],
> = ApiEndpoints[P][M] extends { response: infer R }
  ? R
  : ApiEndpoints[P][M] extends { data: infer D }
    ? D
    : never

export async function typesafeFetch<P extends keyof ApiEndpoints, M extends keyof ApiEndpoints[P]>({
  path,
  method,
  body,
  params,
}: TypesafeApiRequest<P, M>): Promise<TypesafeApiResponse<P, M>> {
  const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''

  const response = await fetch(`${path}${queryString}`, {
    method: method as string,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  return response.json()
}
