import pino from 'pino'
import { Logger } from 'pino'

const logger: Logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  level: process.env.PINO_LOG_LEVEL || 'debug',
  formatters: {
    level: label => {
      return { level: label.toUpperCase() }
    },
  },
  timestamp: false,
  base: null,
})

export default logger
