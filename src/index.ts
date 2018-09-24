interface Interference {
  type: string
  statusCode: number
  details: any
  message: string
}

interface Codes {
  [key: string]: number
}

const httpCodes: Codes = {}

class InterferenceError extends Error implements Interference {
  type: string
  statusCode: number
  details: any
  message: string

  constructor(message: string, type: string = 'GENERIC_ERROR', details: any = {}, code?) {
    super(message)

    Object.defineProperty(this, 'message', {
      configurable: true,
      enumerable: false,
      value: message,
      writable: true,
    })

    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    })

    this.type = type
    this.details = details
    this.statusCode = code || httpCodes[type] || 500

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor)
      return
    }

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      value: new Error(message).stack,
      writable: true,
    })
  }
}

const Interference = (message: string, type?: string, details?: any, code?: number): Interference =>
  new InterferenceError(message, type, details, code)

export default Interference

export const InjectCodes = (codes: Codes = {}) => {
  Object.assign(httpCodes, codes)
}

export const getCodes = () => httpCodes
