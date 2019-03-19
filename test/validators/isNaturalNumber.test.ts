import test from 'tape'

import {
	isNaturalNumber
} from '../../src'

test('validators => isNaturalNumber', t => {
	t.true(isNaturalNumber(1), 'integer')
	t.true(isNaturalNumber(0), 'zero')

	t.false(isNaturalNumber(undefined), 'undefined')
	t.false(isNaturalNumber(null), 'null')
	t.false(isNaturalNumber(''), 'emptyString')
	t.false(isNaturalNumber('string'), 'string')
	t.false(isNaturalNumber(1.1), 'float')
	t.false(isNaturalNumber(NaN), 'NaN')
	t.false(isNaturalNumber(Infinity), 'Infinity')
	t.false(isNaturalNumber(true), 'true')
	t.false(isNaturalNumber(false), 'false')
	t.false(isNaturalNumber(-0), 'zero minus')
	t.false(isNaturalNumber([]), 'Array')
	t.false(isNaturalNumber({}), 'Object')
	t.false(isNaturalNumber(new Date()), 'Date')
	t.false(isNaturalNumber(() => {}), 'Function')

	t.end()
})
