import test from 'tape'

import {
	isObject
} from '../../src/index'

test('validators => isObject', t => {
	t.true(isObject({}), 'Object')
	t.true(isObject(new Date()), 'Date')

	t.false(isObject(undefined), 'undefined')
	t.false(isObject(null), 'null')
	t.false(isObject(''), 'emptyString')
	t.false(isObject('string'), 'string')
	t.false(isObject(1), 'integer')
	t.false(isObject(1.1), 'float')
	t.false(isObject(NaN), 'NaN')
	t.false(isObject(Infinity), 'Infinity')
	t.false(isObject(true), 'true')
	t.false(isObject(false), 'false')
	t.false(isObject(0), 'zero')
	t.false(isObject(-0), 'zero minus')
	t.false(isObject([]), 'Array')
	t.false(isObject(() => {}), 'Function')

	t.end()
})
