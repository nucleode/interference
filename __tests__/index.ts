import Interference, { getCodes, InjectCodes } from '../src'

test('Default empty http codes', () => {
  InjectCodes()
  expect(getCodes()).toEqual({})
})

test('Inject custom error dictionary', () => {
  InjectCodes({
    INVALID_OBJECT_ID: 400,
    MISSING_OBJECT_ID: 400,
    EMPTY_DOCUMENT: 400,
    DOCUMENT_VALIDATION_ERROR: 400,
    MISSING_UNIQUE_KEY: 400,
    MISSINMISSING_AUTH_DATA: 400,
    CREDENTIALS_NOT_VALID: 400,
    MISSING_MANDATORY_PRAMETER: 400,
    TOKEN_NOT_VALID: 401,
    DOCUMENT_NOT_FOUND: 404,
    INCOMPATIBLE_CHANGE_STATUS: 409,
    DUPLICATED_DOCUMENT: 409,
    REMOTE_UNREACHABLE: 503,
    GENERIC_ERROR: 500,
  })

  expect(getCodes()).toEqual({
    INVALID_OBJECT_ID: 400,
    MISSING_OBJECT_ID: 400,
    EMPTY_DOCUMENT: 400,
    DOCUMENT_VALIDATION_ERROR: 400,
    MISSING_UNIQUE_KEY: 400,
    MISSINMISSING_AUTH_DATA: 400,
    CREDENTIALS_NOT_VALID: 400,
    MISSING_MANDATORY_PRAMETER: 400,
    TOKEN_NOT_VALID: 401,
    DOCUMENT_NOT_FOUND: 404,
    INCOMPATIBLE_CHANGE_STATUS: 409,
    DUPLICATED_DOCUMENT: 409,
    REMOTE_UNREACHABLE: 503,
    GENERIC_ERROR: 500,
  })
})

test('Interference isnstanceOf Error', () => {
  const error = Interference('Test error message')
  expect(error).toBeInstanceOf(Error)
})

test('Interference with just a message', () => {
  const error = Interference('Test error message')
  expect(error.message).toBe('Test error message')
  expect(error.type).toBe('GENERIC_ERROR')
  expect(error.details).toEqual({})
  expect(error.statusCode).toBe(500)
})

test('Interference with all but "code" set', () => {
  const error = Interference('Duplicated document', 'DUPLICATED_DOCUMENT', { dupe: '4350394' })
  expect(error.message).toBe('Duplicated document')
  expect(error.type).toBe('DUPLICATED_DOCUMENT')
  expect(error.details.dupe).toBe('4350394')
  expect(error.statusCode).toBe(409)
})

test('Interference with custom "code"', () => {
  const error = Interference('Empty document', 'EMPTY_DOCUMENT', { dupe: '4350394' }, 503)
  expect(error.message).toBe('Empty document')
  expect(error.type).toBe('EMPTY_DOCUMENT')
  expect(error.details.dupe).toBe('4350394')
  expect(error.statusCode).toBe(503)
})

test('Reset Interference httpCodes', () => {
  InjectCodes()
  const error = Interference('Missing ObjectId', 'MISSING_OBJECT_ID', {}, 400)
  expect(error.message).toBe('Missing ObjectId')
  expect(error.type).toBe('MISSING_OBJECT_ID')
  expect(error.details).toEqual({})
  expect(error.statusCode).toBe(400)
})
