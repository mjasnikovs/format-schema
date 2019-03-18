import test from 'tape'

import {
	isString
} from '../../src/index'

test('validators => isString', t => {
	t.true(isString(''), 'emptyString')
	t.true(isString('string'), 'string')

	t.false(isString(undefined), 'undefined')
	t.false(isString(null), 'null')
	t.false(isString(1), 'integer')
	t.false(isString(1.1), 'float')
	t.false(isString(NaN), 'NaN')
	t.false(isString(Infinity), 'Infinity')
	t.false(isString(true), 'true')
	t.false(isString(false), 'false')
	t.false(isString(0), 'zero')
	t.false(isString(-0), 'zero minus')
	t.false(isString([]), 'Array')
	t.false(isString({}), 'Object')
	t.false(isString(new Date()), 'Date')
	t.false(isString(() => {}), 'Function')

	t.end()
})
