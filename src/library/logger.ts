import pino from 'pino'
import { Logger } from 'pino'

import { isProduction, logLevel } from './environment'

const logger: Logger = pino({
  transport: isProduction
    ? {
        target: 'pino-pretty',
        options: {
          colorize: false,
          messageFormat: '{level}: {msg}',
          ignore: 'pid,hostname,time',
        },
      }
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
  level: logLevel || 'debug',
  formatters: {
    level: label => {
      return { level: label.toUpperCase() }
    },
  },
  timestamp: false,
  base: null,
})

logger.info(`Pino logger set to ${logLevel}`)

export default logger
