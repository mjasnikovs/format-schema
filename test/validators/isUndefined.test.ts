import test from 'tape'

import {
	isUndefined
} from '../../src/index'

test('validators => isUndefined', t => {
	t.true(isUndefined(undefined), 'undefined')

	t.false(isUndefined(null), 'null')
	t.false(isUndefined(''), 'emptyString')
	t.false(isUndefined('string'), 'string')
	t.false(isUndefined(1), 'integer')
	t.false(isUndefined(1.1), 'float')
	t.false(isUndefined(NaN), 'NaN')
	t.false(isUndefined(Infinity), 'Infinity')
	t.false(isUndefined(true), 'true')
	t.false(isUndefined(false), 'false')
	t.false(isUndefined(0), 'zero')
	t.false(isUndefined(-0), 'zero minus')
	t.false(isUndefined([]), 'Array')
	t.false(isUndefined({}), 'Object')
	t.false(isUndefined(new Date()), 'Date')
	t.false(isUndefined(() => {}), 'Function')

	t.end()
})
