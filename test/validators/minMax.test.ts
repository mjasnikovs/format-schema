import test from 'tape'

import {
	isMaxNumber,
	isMinNumber,
	isMaxString,
	isMinString
} from '../../src'

test('validators => minMax', t => {
	t.true(isMaxNumber(1, 1), 'isMaxNumber true')
	t.true(isMinNumber(1, 1), 'isMinNumber true')
	t.true(isMaxString('string', 6), 'isMaxString true')
	t.true(isMinString('string', 6), 'isMinString true')

	t.false(isMaxNumber(2, 1), 'isMaxNumber false')
	t.false(isMinNumber(0, 1), 'isMinNumber false')
	t.false(isMaxString('strings', 6), 'isMaxString false')
	t.false(isMinString('strin', 6), 'isMinString false')

	t.end()
})
