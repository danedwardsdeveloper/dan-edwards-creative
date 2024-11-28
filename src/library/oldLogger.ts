// import chalk from 'chalk'
// import { NextRequest, NextResponse } from 'next/server'

// const CURRENT_LOG_LEVEL: Level = 'debug'

// const divider = '----------------------------------'

// type Level = 'verbose' | 'info' | 'warn' | 'error' | 'debug' | 'silly'
// const LOG_LEVEL_VALUES: Record<Level, number> = {
//   silly: 0,
//   debug: 1,
//   verbose: 2,
//   info: 3,
//   warn: 4,
//   error: 5,
// }

// type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose' | 'silly'

// const LOG_LEVEL_COLORS: Record<LogLevel, typeof chalk.blue> = {
//   error: chalk.red,
//   warn: chalk.hex('#FFA500'), // Orange
//   info: chalk.blue,
//   debug: chalk.blue,
//   verbose: chalk.blue,
//   silly: chalk.blue,
// }

// interface LogMessage {
//   timestamp: string
//   level: LogLevel
//   messages: unknown[]
//   metadata?: Record<string, unknown>
// }

// function shouldLog(messageLevel: LogLevel): boolean {
//   return LOG_LEVEL_VALUES[messageLevel] >= LOG_LEVEL_VALUES[CURRENT_LOG_LEVEL]
// }

// function formatValue(value: unknown): string {
//   if (value === null) return 'null'
//   if (value === undefined) return 'undefined'
//   if (typeof value === 'object') {
//     try {
//       return JSON.stringify(value, null, 2)
//     } catch {
//       return String(value)
//     }
//   }
//   return String(value)
// }

// function formatLog({ timestamp, level, messages, metadata }: LogMessage): string {
//   const colorFn = LOG_LEVEL_COLORS[level]
//   const formattedMessages = messages.map(formatValue).join(' ')
//   let formattedMessage = `${colorFn(divider)}\n${colorFn(`${level}:`)}\n${formattedMessages}`
//   if (metadata) {
//     formattedMessage += `\n${JSON.stringify(metadata, null, 2)}`
//   }
//   formattedMessage += `\n${colorFn(divider)}`
//   return formattedMessage
// }

// function createLogger() {
//   const log = (level: LogLevel, ...args: unknown[]) => {
//     if (shouldLog(level)) {
//       let messages = args
//       let metadata: Record<string, unknown> | undefined

//       const lastArg = args[args.length - 1]
//       if (lastArg && typeof lastArg === 'object' && !Array.isArray(lastArg) && !(lastArg instanceof Error)) {
//         messages = args.slice(0, -1)
//         metadata = lastArg as Record<string, unknown>
//       }

//       const logMessage: LogMessage = {
//         timestamp: new Date().toISOString(),
//         level,
//         messages,
//         metadata,
//       }

//       const formattedMessage = formatLog(logMessage)

//       switch (level) {
//         case 'error':
//           console.error(formattedMessage)
//           break
//         case 'warn':
//           console.warn(formattedMessage)
//           break
//         case 'info':
//           console.info(formattedMessage) // eslint-disable-line no-console
//           break
//         case 'debug':
//         case 'verbose':
//         case 'silly':
//           console.debug(formattedMessage) // eslint-disable-line no-console
//           break
//       }
//     }
//   }

//   return {
//     error: (...args: unknown[]) => log('error', ...args),
//     warn: (...args: unknown[]) => log('warn', ...args),
//     info: (...args: unknown[]) => log('info', ...args),
//     debug: (...args: unknown[]) => log('debug', ...args),
//     verbose: (...args: unknown[]) => log('verbose', ...args),
//     silly: (...args: unknown[]) => log('silly', ...args),
//   }
// }

// export const logger = createLogger()

// export function loggerMiddleware(request: NextRequest) {
//   const start = Date.now()
//   const { method, url } = request

//   return {
//     logResponse: (response: NextResponse) => {
//       const duration = Date.now() - start
//       const status = response.status

//       if (status >= 400) {
//         logger.error(method, url, status, `${duration}ms`)
//       } else {
//         logger.info(method, url, status, `${duration}ms`)
//       }
//     },
//   }
// }

// export const logError = (error: Error, context?: string) => {
//   if (context) {
//     logger.error(context + ':', error.message, { stack: error.stack })
//   } else {
//     logger.error(error.message, { stack: error.stack })
//   }
// }

// export const logAPIError = (request: NextRequest, response: NextResponse, error: Error) => {
//   logger.error('API Error:', request.method, request.url, {
//     error: error.message,
//     stack: error.stack,
//     url: request.url,
//     headers: Object.fromEntries(request.headers),
//   })
// }
