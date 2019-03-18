import test from 'tape'

import {
	inEnum
} from '../../src/index'

test('validators => isnEnum', t => {
	t.true(inEnum(2, [1, 2]), 'number true')
	t.false(inEnum(3, [1, 2]), 'number false')

	t.true(inEnum('2', ['1', '2']), 'string true')
	t.false(inEnum('3', ['1', '2']), 'string false')

	t.end()
})
