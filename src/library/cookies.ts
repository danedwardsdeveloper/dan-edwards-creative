import { isProduction } from './environment'

const oneYearInSeconds = 365 * 24 * 60 * 60
export const cookieName = 'exclude'

type CookieOptions = {
  name: string
  value: string
  httpOnly: boolean
  secure: boolean
  sameSite: 'strict'
  maxAge: number
  path: string
}

export function createCookieOptions(tokenValue: string): CookieOptions {
  return {
    name: cookieName,
    value: tokenValue,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: oneYearInSeconds,
    path: '/',
  }
}

export interface Token {
  sub: string
  exp: number
}

export function generateTokenPayload(userId: string): Token {
  return {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + oneYearInSeconds,
  }
}
