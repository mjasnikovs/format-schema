import test from 'tape'

import {
	isLongitude
} from '../../src/index'

test('validators => isLongitude', t => {
	t.true(isLongitude(1), 'integer')
	t.true(isLongitude(0), 'zero')
	t.true(isLongitude(-0), 'zero minus')
	t.true(isLongitude(1.1), 'float')

	t.false(isLongitude(undefined), 'undefined')
	t.false(isLongitude(null), 'null')
	t.false(isLongitude(''), 'emptyString')
	t.false(isLongitude('string'), 'string')
	t.false(isLongitude(NaN), 'NaN')
	t.false(isLongitude(Infinity), 'Infinity')
	t.false(isLongitude(true), 'true')
	t.false(isLongitude(false), 'false')
	t.false(isLongitude([]), 'Array')
	t.false(isLongitude({}), 'Object')
	t.false(isLongitude(new Date()), 'Date')
	t.false(isLongitude(() => {}), 'Function')

	t.false(isLongitude(-181), '-181')
	t.false(isLongitude(181), '181')

	t.end()
})
