import pino, { type Logger } from 'pino'

import { isProduction, logLevel } from './environment'

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
  level: logLevel,
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
