import test from 'ava'
import InterferenceFactory, { Interference, isInterference } from '../src'

test('InterferenceFactory creates isnstanceOf Error', t => {
  const error = InterferenceFactory({ message: 'Test error message', type: 'GENERIC_ERROR' })
  t.true(error instanceof Error)
})

test('Interference class creates isnstanceOf Error', t => {
  const error = new Interference({ message: 'Test error message', type: 'GENERIC_ERROR' })
  t.true(error instanceof Error)
})

test('Check prototypes', t => {
  t.true(
    InterferenceFactory({ message: 'Test error message', type: 'GENERIC_ERROR' }) instanceof
      Interference,
  )
})

test('Interference with just a message', t => {
  const error = InterferenceFactory({ message: 'Test error message', type: 'GENERIC_ERROR' })
  t.is(error.message, 'Test error message')
  t.is(error.type, 'GENERIC_ERROR')
  t.deepEqual(error.details, {})
  t.is(error.statusCode, undefined)
})

test('Interference with all but "code" set', t => {
  const error = InterferenceFactory({
    message: 'Duplicated document',
    type: 'DUPLICATED_DOCUMENT',
    details: {
      dupe: '4350394',
    },
  })
  t.is(error.message, 'Duplicated document')
  t.is(error.type, 'DUPLICATED_DOCUMENT')
  t.is(error.details.dupe, '4350394')
  t.is(error.statusCode, undefined)
})

test('Interference with custom "code"', t => {
  const error = InterferenceFactory({
    message: 'Empty document',
    type: 'EMPTY_DOCUMENT',
    details: { dupe: '4350394' },
    statusCode: 503,
  })
  t.is(error.message, 'Empty document')
  t.is(error.type, 'EMPTY_DOCUMENT')
  t.is(error.details.dupe, '4350394')
  t.is(error.statusCode, 503)
})

test('Reset Interference httpCodes', t => {
  const error = InterferenceFactory({
    message: 'Missing ObjectId',
    type: 'MISSING_OBJECT_ID',
    details: {},
    statusCode: 400,
  })
  t.is(error.message, 'Missing ObjectId')
  t.is(error.type, 'MISSING_OBJECT_ID')
  t.deepEqual(error.details, {})
  t.is(error.statusCode, 400)
})

test('isInterference', t => {
  t.false(isInterference(undefined))
  t.false(isInterference(null))
  t.false(isInterference(1))
  t.false(isInterference(''))
  t.false(isInterference({}))
  t.true(isInterference(InterferenceFactory({ message: 'Hello world', type: 'GENERIC_ERROR' })))
})
