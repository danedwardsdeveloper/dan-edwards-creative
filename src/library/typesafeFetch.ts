import { logger } from '@/library/logger'

import { ApiEndpoints } from '../types/apiEndpoints'

function buildApiUrl<P extends keyof ApiEndpoints, M extends keyof ApiEndpoints[P]>(
  path: P,
  method: M,
  params: ApiEndpoints[P][M] extends { params: unknown } ? ApiEndpoints[P][M]['params'] : never,
) {
  return `${path}?${new URLSearchParams(params as Record<string, string>).toString()}`
}

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
  const url = params && method ? buildApiUrl(path, method, params) : path

  logger.debug('Generated URL:', url)

  const response = await fetch(url, {
    method: method as string,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  return response.json()
}
