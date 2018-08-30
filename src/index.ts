interface Interference {
  type: string
  statusCode: number
  details: any
  message: string
}

interface Codes {
  [key: string]: number
}

let httpCodes: Codes = {}

class Interference extends Error implements Interference {
  type: string
  statusCode: number
  details: any
  message: string

  constructor(
    message: string,
    type: string = 'GENERIC_ERROR',
    details: any = {},
    code: number = 500,
  ) {
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
    this.statusCode = httpCodes[code] || code

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

export default (message: string, type?: string, details?: any, code?: number): Interference =>
  new Interference(message, type, details, code)

export const InjectCodes = (codes?: Codes) => {
  if (codes) {
    httpCodes = codes
  }
}

export const getCodes = () => httpCodes
