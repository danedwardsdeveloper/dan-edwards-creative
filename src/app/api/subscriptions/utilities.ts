import crypto from 'crypto'

import { dynamicBaseURL } from '@/library/environment'

export function generateToken(): string {
  return crypto.randomBytes(10).toString('hex')
}

export function encodeEmail(plainEmail: string): string {
  return Buffer.from(plainEmail).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeEmail(encodedEmail: string): string {
  const base64 = encodedEmail
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(encodedEmail.length + ((4 - (encodedEmail.length % 4)) % 4), '=')

  return Buffer.from(base64, 'base64').toString()
}

export function generateConfirmationLink(token: string, plainEmail: string): string {
  const encodedEmail = encodeEmail(plainEmail)
  return `${dynamicBaseURL}/confirm?e=${encodedEmail}&x=${token}`
}

export function generateUnsubscribeLink(token: string, plainEmail: string): string {
  const encodedEmail = encodeEmail(plainEmail)
  return `${dynamicBaseURL}/unsubscribe?e=${encodedEmail}&x=${token}`
}
