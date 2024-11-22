import { SESClient } from '@aws-sdk/client-ses'

const keyId = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_SECRET_ACCESS_KEY
export const fromEmail = process.env.SES_FROM_EMAIL

if (!keyId) {
  throw new Error('AWS_ACCESS_KEY_ID missing')
}
if (!secretKey) {
  throw new Error('AWS_SECRET_ACCESS_KEY missing')
}
if (!process.env.SES_FROM_EMAIL) {
  throw new Error('SES_FROM_EMAIL missing')
}

export const sesClient = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: keyId,
    secretAccessKey: secretKey,
  },
})
