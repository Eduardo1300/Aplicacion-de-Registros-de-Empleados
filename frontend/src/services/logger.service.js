/**
 * Logger Service - Sistema de Logging
 */

const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 }
let currentLogLevel = LOG_LEVELS.INFO

const formatLog = (level, module, message, data) => {
  const timestamp = new Date().toLocaleTimeString('es-ES')
  const levelName = Object.keys(LOG_LEVELS).find(k => LOG_LEVELS[k] === level)
  return `[${timestamp}] [${levelName}] [${module}] ${message}${data ? ' ' + JSON.stringify(data) : ''}`
}

const shouldLog = (level) => level >= currentLogLevel

export const useLogger = (moduleName = 'APP') => ({
  debug: (message, data) => {
    if (shouldLog(LOG_LEVELS.DEBUG)) console.debug(formatLog(LOG_LEVELS.DEBUG, moduleName, message, data))
  },
  info: (message, data) => {
    if (shouldLog(LOG_LEVELS.INFO)) console.info(formatLog(LOG_LEVELS.INFO, moduleName, message, data))
  },
  warn: (message, data) => {
    if (shouldLog(LOG_LEVELS.WARN)) console.warn(formatLog(LOG_LEVELS.WARN, moduleName, message, data))
  },
  error: (message, data) => {
    if (shouldLog(LOG_LEVELS.ERROR)) console.error(formatLog(LOG_LEVELS.ERROR, moduleName, message, data))
  }
})

export const setLogLevel = (level) => { currentLogLevel = level }
