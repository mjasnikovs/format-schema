import test from 'tape'

import {
	isConstructor
} from '../../src'

test('validators => isConstructor', t => {
	t.true(isConstructor(Error), 'true')
	t.false(isConstructor(false), 'false')

	t.end()
})
