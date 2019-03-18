import test from 'tape'

import {
	isZero
} from '../../src/index'

test('validators => isZero', t => {
	t.true(isZero(0), 'zero')

	t.false(isZero(undefined), 'undefined')
	t.false(isZero(null), 'null')
	t.false(isZero(''), 'emptyString')
	t.false(isZero('string'), 'string')
	t.false(isZero(1), 'integer')
	t.false(isZero(1.1), 'float')
	t.false(isZero(NaN), 'NaN')
	t.false(isZero(Infinity), 'Infinity')
	t.false(isZero(true), 'true')
	t.false(isZero(false), 'false')
	t.false(isZero(-0), 'zero minus')
	t.false(isZero([]), 'Array')
	t.false(isZero({}), 'Object')
	t.false(isZero(new Date()), 'Date')
	t.false(isZero(() => {}), 'Function')

	t.end()
})
