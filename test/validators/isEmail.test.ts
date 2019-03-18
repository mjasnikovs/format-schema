import test from 'tape'

import {
	isEmail
} from '../../src/index'

test('validators => isEmail', t => {
	t.true(isEmail('test@test.com'), 'test@test.com')
	t.true(isEmail('test.test@test.com'), 'test.test@test.com')

	t.false(isEmail('test@test@test.com'), 'test@test@test.com')
	t.false(isEmail('test@test'), 'test@test')

	t.false(isEmail(undefined), 'undefined')
	t.false(isEmail(null), 'null')
	t.false(isEmail(''), 'emptyString')
	t.false(isEmail('string'), 'string')
	t.false(isEmail(1), 'integer')
	t.false(isEmail(1.1), 'float')
	t.false(isEmail(NaN), 'NaN')
	t.false(isEmail(Infinity), 'Infinity')
	t.false(isEmail(true), 'true')
	t.false(isEmail(false), 'false')
	t.false(isEmail(0), 'zero')
	t.false(isEmail(-0), 'zero minus')
	t.false(isEmail([]), 'Array')
	t.false(isEmail({}), 'Object')
	t.false(isEmail(new Date()), 'Date')
	t.false(isEmail(() => {}), 'Function')

	t.end()
})
