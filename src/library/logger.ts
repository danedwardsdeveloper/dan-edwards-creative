/* eslint-disable no-console */
type LogArgs = unknown[]
const logger = {
  debug: (...args: LogArgs): void => console.debug('[debug]', ...args),
  info: (...args: LogArgs): void => console.info('[info]', ...args),
  warn: (...args: LogArgs): void => console.warn('[warn]', ...args),
  error: (...args: LogArgs): void => console.error('[error]', ...args),
} as const
export type Logger = typeof logger
export default logger
