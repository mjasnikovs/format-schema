import test from 'tape'

import {
	isFloat
} from '../../src/index'

test('validators => isFloat', t => {
	t.true(isFloat(0), 'zero')
	t.true(isFloat(1.1), 'float')
	t.true(isFloat(1), 'integer')
	t.true(isFloat(-0), 'zero minus')

	t.false(isFloat(undefined), 'undefined')
	t.false(isFloat(null), 'null')
	t.false(isFloat(''), 'emptyString')
	t.false(isFloat('string'), 'string')
	t.false(isFloat(NaN), 'NaN')
	t.false(isFloat(Infinity), 'Infinity')
	t.false(isFloat(true), 'true')
	t.false(isFloat(false), 'false')
	t.false(isFloat([]), 'Array')
	t.false(isFloat({}), 'Object')
	t.false(isFloat(new Date()), 'Date')
	t.false(isFloat(() => {}), 'Function')

	t.end()
})
