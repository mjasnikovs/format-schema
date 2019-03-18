import test from 'tape'

import {
	isLatitude
} from '../../src'

test('validators => isLatitude', t => {
	t.true(isLatitude(1), 'integer')
	t.true(isLatitude(0), 'zero')
	t.true(isLatitude(-0), 'zero minus')
	t.true(isLatitude(1.1), 'float')

	t.false(isLatitude(undefined), 'undefined')
	t.false(isLatitude(null), 'null')
	t.false(isLatitude(''), 'emptyString')
	t.false(isLatitude('string'), 'string')
	t.false(isLatitude(NaN), 'NaN')
	t.false(isLatitude(Infinity), 'Infinity')
	t.false(isLatitude(true), 'true')
	t.false(isLatitude(false), 'false')
	t.false(isLatitude([]), 'Array')
	t.false(isLatitude({}), 'Object')
	t.false(isLatitude(new Date()), 'Date')
	t.false(isLatitude(() => {}), 'Function')

	t.false(isLatitude(-91), '-91')
	t.false(isLatitude(91), '91')

	t.end()
})
