import test from 'tape'

import {
	isInteger
} from '../../src/index'

test('validators => isInteger', t => {
	t.true(isInteger(1), 'integer')
	t.true(isInteger(0), 'zero')
	t.true(isInteger(-0), 'zero minus')

	t.false(isInteger(undefined), 'undefined')
	t.false(isInteger(null), 'null')
	t.false(isInteger(''), 'emptyString')
	t.false(isInteger('string'), 'string')
	t.false(isInteger(1.1), 'float')
	t.false(isInteger(NaN), 'NaN')
	t.false(isInteger(Infinity), 'Infinity')
	t.false(isInteger(true), 'true')
	t.false(isInteger(false), 'false')
	t.false(isInteger([]), 'Array')
	t.false(isInteger({}), 'Object')
	t.false(isInteger(new Date()), 'Date')
	t.false(isInteger(() => {}), 'Function')

	t.end()
})
