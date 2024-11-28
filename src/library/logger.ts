import pino, { type Logger } from 'pino'

import { isProduction } from './environment'

const LOG_LEVEL: Logger['level'] = 'debug'

const logger: Logger = pino({
  transport: isProduction
    ? {
        target: 'pino/file',
        options: {
          destination: 1,
          messageFormat: '{level}: {msg}',
        },
      }
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
  level: LOG_LEVEL,
  formatters: {
    level: label => {
      return { level: label.toUpperCase() }
    },
    bindings: () => ({}),
  },
  timestamp: false,
  base: undefined,
  browser: {
    disabled: isProduction,
  },
})

export default logger
