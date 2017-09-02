const test = require('tape')
const schema = require('tape-schema')

const {
	graphql,
	GraphQLSchema,
	GraphQLString,
	GraphQLObjectType
} = require('graphql')

const {
	graphqlFormat,
	stringFormat
} = require('../index')

const generateSchema = (config = {}) =>
	new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'query',
			description: 'test query',
			fields: {
				input: {
					type: GraphQLString,
					description: 'Provides test string',
					args: {
						string: {
							type: GraphQLString
						}
					},
					resolve: (parentValue, args) =>
						graphqlFormat(config, args)
							.then(({string}) => string)
				}
			}
		})
	})

const generateGraphql = (config, string = null) =>
	graphql(generateSchema(config), `{input(string:${JSON.stringify(string)})}`)


test('graphql string trim', t => {
	const string = ' asfasfasgasgA \r\n'

	generateGraphql({string: stringFormat({trim: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: string.trim()},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string trimLeft', t => {
	const string = ' sdjsdnjknj nsad \r\n'

	generateGraphql({string: stringFormat({trimLeft: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: string.trimLeft()},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string trimRight', t => {
	const string = ' aasfasgasAS  \r\n'

	generateGraphql({string: stringFormat({trimRight: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: string.trimRight()},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string toLowerCase', t => {
	const string = ' Apple \r\n'

	generateGraphql({string: stringFormat({toLowerCase: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: string.toLowerCase()},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string toUpperCase', t => {
	const string = ' apple \r\n'

	generateGraphql({string: stringFormat({toUpperCase: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: string.toUpperCase()},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string truncate', t => {
	const string = ' Apple \r\n'

	generateGraphql({string: stringFormat({truncate: 4})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: ' App'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string notEmpty', t => {
	const string = ''

	generateGraphql({string: stringFormat({notEmpty: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "string" has invalid value "". Expected not-empty string, found "".',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string min', t => {
	const string = '1234'

	generateGraphql({string: stringFormat({min: 4})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: '1234'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string min invalid', t => {
	const string = '123456789'

	generateGraphql({string: stringFormat({min: 20})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "string" has invalid value "123456789". Expected minimum length of 20 characters, found "9".',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string max', t => {
	const string = '1234'

	generateGraphql({string: stringFormat({max: 4})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: '1234'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string max invalid', t => {
	const string = '123456789'

	generateGraphql({string: stringFormat({max: 3})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "string" has invalid value "123456789". Expected maximum length of 3 characters, found "9".',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string capitalize: words', t => {
	const string = 'The quick brown fox jumps over the lazy dog.'

	generateGraphql({string: stringFormat({capitalize: 'words'})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: 'The Quick Brown Fox Jumps Over The Lazy Dog.'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string capitalize: sentences', t => {
	const string = 'the quick brown fox jumps. over the lazy dog.'

	generateGraphql({string: stringFormat({capitalize: 'sentences'})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: 'The quick brown fox jumps. Over the lazy dog.'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string capitalize: first', t => {
	const string = 'the quick brown fox jumps.'

	generateGraphql({string: stringFormat({capitalize: 'first'})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: 'The quick brown fox jumps.'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string email', t => {
	const string = 'test@test.com'

	generateGraphql({string: stringFormat({email: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: 'test@test.com'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string email with subdomain', t => {
	const string = 'test.test@test.com'

	generateGraphql({string: stringFormat({email: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: 'test.test@test.com'},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string email invalid', t => {
	const string = 'test@test'

	generateGraphql({string: stringFormat({email: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "string" has invalid value "test@test". Expected valid email, found "test@test".',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql string email invalid @', t => {
	const string = 'test@test@test.com'

	generateGraphql({string: stringFormat({email: true})}, string)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "string" has invalid value "test@test@test.com". Expected valid email, found "test@test@test.com".',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})
