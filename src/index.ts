const symInterference = Symbol.for('interference')

export class Interference extends Error {
  public type: string
  public statusCode?: number
  public details: any
  public message: string

  constructor(
    message: string,
    type: string = 'GENERIC_ERROR',
    details: any = {},
    statusCode?: number,
  ) {
    super(message)
    Object.setPrototypeOf(this, Interference.prototype)

    Object.defineProperty(this, symInterference, { value: true })

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
    this.statusCode = statusCode

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

export function isInterference(value: any): value is Interference {
  return typeof value === 'object' && value !== null ? value[symInterference] === true : false
}

export default function InterferenceFactory(
  message: string,
  type?: string,
  details?: any,
  statusCode?: number,
): Interference {
  return new Interference(message, type, details, statusCode)
}
