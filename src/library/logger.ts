import { NextRequest, NextResponse } from 'next/server'

type Level = 'verbose' | 'info' | 'warn' | 'error' | 'debug' | 'silly'
const CURRENT_LOG_LEVEL: Level = 'info'

const LOG_LEVEL_VALUES: Record<Level, number> = {
  silly: 0,
  debug: 1,
  verbose: 2,
  info: 3,
  warn: 4,
  error: 5,
}

type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose' | 'silly'

interface LogMessage {
  timestamp: string
  level: LogLevel
  message: string
  metadata?: Record<string, unknown>
}

function shouldLog(messageLevel: LogLevel): boolean {
  return LOG_LEVEL_VALUES[messageLevel] >= LOG_LEVEL_VALUES[CURRENT_LOG_LEVEL]
}

function formatLog({ timestamp, level, message, metadata }: LogMessage): string {
  let formattedMessage = `${timestamp} ${level}: ${message}`
  if (metadata) {
    formattedMessage += `\n${JSON.stringify(metadata, null, 2)}`
  }
  return formattedMessage
}

function createLogger() {
  const log = (level: LogLevel, message: string, metadata?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development' && shouldLog(level)) {
      const logMessage: LogMessage = {
        timestamp: new Date().toISOString(),
        level,
        message,
        metadata,
      }

      const formattedMessage = formatLog(logMessage)

      switch (level) {
        case 'error':
          console.error(formattedMessage)
          break
        case 'warn':
          console.warn(formattedMessage)
          break
        case 'info':
          console.info(formattedMessage) // eslint-disable-line no-console
          break
        case 'debug':
        case 'verbose':
        case 'silly':
          console.debug(formattedMessage) // eslint-disable-line no-console
          break
      }
    }
  }

  return {
    error: (message: string, metadata?: Record<string, unknown>) => log('error', message, metadata),
    warn: (message: string, metadata?: Record<string, unknown>) => log('warn', message, metadata),
    info: (message: string, metadata?: Record<string, unknown>) => log('info', message, metadata),
    debug: (message: string, metadata?: Record<string, unknown>) => log('debug', message, metadata),
    verbose: (message: string, metadata?: Record<string, unknown>) => log('verbose', message, metadata),
    silly: (message: string, metadata?: Record<string, unknown>) => log('silly', message, metadata),
  }
}

export const logger = createLogger()

export function loggerMiddleware(request: NextRequest) {
  const start = Date.now()
  const { method, url } = request

  return {
    logResponse: (response: NextResponse) => {
      const duration = Date.now() - start
      const status = response.status
      const message = `${method} ${url} ${status} ${duration}ms`

      if (status >= 400) {
        logger.error(message)
      } else {
        logger.info(message)
      }
    },
  }
}

export const logError = (error: Error, context?: string) => {
  logger.error(`${context ? context + ': ' : ''}${error.message}`, {
    stack: error.stack,
  })
}

export const logAPIError = (request: NextRequest, response: NextResponse, error: Error) => {
  logger.error(`API Error: ${request.method} ${request.url}`, {
    error: error.message,
    stack: error.stack,
    url: request.url,
    headers: Object.fromEntries(request.headers),
  })
}
