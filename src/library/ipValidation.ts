import { NextRequest, NextResponse } from 'next/server'

import { logger } from './logger'

interface ValidateIpOptions {
  allowLocalhost?: boolean
  customMessage?: string
}

interface ValidationResult {
  isValid: boolean
  response?: NextResponse
}

export function validateRequestIp(request: NextRequest, options: ValidateIpOptions = {}): ValidationResult {
  const { allowLocalhost = false, customMessage = 'Ignored localhost attempt' } = options

  const ip = request.ip || request.headers.get('x-forwarded-for') || '0.0.0.0'

  if (!allowLocalhost && (ip === '::1' || ip === '127.0.0.1')) {
    logger.info(customMessage)
    return {
      isValid: false,
      response: NextResponse.json({ message: customMessage }),
    }
  }

  return { isValid: true }
}
