import test from 'ava'
import Interference, { InterferenceError } from '../src'

test('Interference isnstanceOf Error', t => {
  const error = Interference('Test error message')
  t.true(error instanceof Error)
})

test('Check prototypes', t => {
  t.true(Interference('Test error message') instanceof InterferenceError)
})

test('Interference with just a message', t => {
  const error = Interference('Test error message')
  t.is(error.message, 'Test error message')
  t.is(error.type, 'GENERIC_ERROR')
  t.deepEqual(error.details, {})
  t.is(error.statusCode, 500)
})

test('Interference with all but "code" set', t => {
  const error = Interference('Duplicated document', 'DUPLICATED_DOCUMENT', { dupe: '4350394' })
  t.is(error.message, 'Duplicated document')
  t.is(error.type, 'DUPLICATED_DOCUMENT')
  t.is(error.details.dupe, '4350394')
  t.is(error.statusCode, 500)
})

test('Interference with custom "code"', t => {
  const error = Interference('Empty document', 'EMPTY_DOCUMENT', { dupe: '4350394' }, 503)
  t.is(error.message, 'Empty document')
  t.is(error.type, 'EMPTY_DOCUMENT')
  t.is(error.details.dupe, '4350394')
  t.is(error.statusCode, 503)
})

test('Reset Interference httpCodes', t => {
  const error = Interference('Missing ObjectId', 'MISSING_OBJECT_ID', {}, 400)
  t.is(error.message, 'Missing ObjectId')
  t.is(error.type, 'MISSING_OBJECT_ID')
  t.deepEqual(error.details, {})
  t.is(error.statusCode, 400)
})
