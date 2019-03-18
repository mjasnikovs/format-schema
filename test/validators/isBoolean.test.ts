import test from 'tape'

import {
	isBoolean
} from '../../src/index'

test('validators => isBoolean', t => {
	t.true(isBoolean(true), 'true')
	t.true(isBoolean(false), 'false')

	t.false(isBoolean(undefined), 'undefined')
	t.false(isBoolean(null), 'null')
	t.false(isBoolean(''), 'emptyString')
	t.false(isBoolean('string'), 'string')
	t.false(isBoolean(1), 'integer')
	t.false(isBoolean(1.1), 'float')
	t.false(isBoolean(NaN), 'NaN')
	t.false(isBoolean(Infinity), 'Infinity')
	t.false(isBoolean(0), 'zero')
	t.false(isBoolean(-0), 'zero minus')
	t.false(isBoolean([]), 'Array')
	t.false(isBoolean({}), 'Object')
	t.false(isBoolean(new Date()), 'Date')
	t.false(isBoolean(() => {}), 'Function')

	t.end()
})
