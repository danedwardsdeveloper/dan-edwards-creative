import crypto from 'crypto'

import { dynamicBaseURL } from '@/library/environment'

export function generateToken(): string {
  return crypto.randomBytes(10).toString('hex')
}

export function encodeEmail(email: string): string {
  return Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function generateConfirmationLink(token: string, email: string): string {
  const encodedEmail = encodeEmail(email)
  return `${dynamicBaseURL}/confirm?e=${encodedEmail}&x=${token}`
}

export function generateUnsubscribeLink(token: string, email: string): string {
  const encodedEmail = encodeEmail(email)
  return `${dynamicBaseURL}/unsubscribe?e=${encodedEmail}&x=${token}`
}

export function decodeEmail(encodedEmail: string): string {
  const base64 = encodedEmail
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(encodedEmail.length + ((4 - (encodedEmail.length % 4)) % 4), '=')

  return Buffer.from(base64, 'base64').toString()
}
