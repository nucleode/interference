const symInterference = Symbol.for('interference')

interface Options {
  message: string
  type: string
  details?: any
  statusCode?: number
}

export class Interference extends Error {
  public type: string
  public statusCode?: number
  public details: any
  public message: string

  constructor({ message, type, details = {}, statusCode }: Options) {
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

  public toJSON() {
    return {
      type: this.type,
      message: this.message,
      details: this.details,
      statusCode: this.statusCode
    }
  }
}

export function isInterference(value: any): value is Interference {
  return typeof value === 'object' && value !== null ? value[symInterference] === true : false
}

export default function InterferenceFactory(options: Options): Interference {
  return new Interference(options)
}
