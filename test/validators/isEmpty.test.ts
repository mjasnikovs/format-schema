import test from 'tape'

import {
	isEmpty
} from '../../src/index'

test('validators => isEmpty', t => {
	t.true(isEmpty(undefined), 'undefined')
	t.true(isEmpty(null), 'null')
	t.true(isEmpty(''), 'emptyString')

	t.false(isEmpty('string'), 'string')
	t.false(isEmpty(1), 'integer')
	t.false(isEmpty(1.1), 'float')
	t.false(isEmpty(NaN), 'NaN')
	t.false(isEmpty(Infinity), 'Infinity')
	t.false(isEmpty(true), 'true')
	t.false(isEmpty(false), 'false')
	t.false(isEmpty(0), 'zero')
	t.false(isEmpty(-0), 'zero minus')
	t.false(isEmpty([]), 'Array')
	t.false(isEmpty({}), 'Object')
	t.false(isEmpty(new Date()), 'Date')
	t.false(isEmpty(() => {}), 'Function')

	t.end()
})
