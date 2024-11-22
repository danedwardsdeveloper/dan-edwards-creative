import { SESClient } from '@aws-sdk/client-ses'

const keyId = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_SECRET_ACCESS_KEY

if (!keyId) {
  throw new Error('AWS_ACCESS_KEY_ID missing')
}
if (!secretKey) {
  throw new Error('AWS_SECRET_ACCESS_KEY missing')
}

export const sesClient = new SESClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: keyId,
    secretAccessKey: secretKey,
  },
})
