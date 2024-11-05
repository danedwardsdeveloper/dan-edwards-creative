export interface SpotifyErrorResponse {
  error: {
    status: number
    message: string
    reason?: string
  }
}

export interface SpotifyTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  scope: string
}

export interface SpotifySuccessResponse {
  status: number
  statusText: string
  response: string
}
