const test = require('tape')
const schema = require('tape-schema')

const {
	graphql,
	GraphQLSchema,
	GraphQLInt,
	GraphQLObjectType
} = require('graphql')

const {
	graphqlFormat,
	intFormat
} = require('../index')

const generateSchema = (config = {}) =>
	new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'query',
			description: 'test query',
			fields: {
				input: {
					type: GraphQLInt,
					description: 'Provides test integer',
					args: {
						integer: {
							type: GraphQLInt
						}
					},
					resolve: (parentValue, args) =>
						graphqlFormat(config, args)
							.then(({integer}) => integer)
				}
			}
		})
	})

const generateGraphql = (config, integer = null) =>
	graphql(generateSchema(config), `{input(integer:${JSON.stringify(integer)})}`)


test('graphql int naturalNumber', t => {
	const integer = 10

	generateGraphql({integer: intFormat({naturalNumber: true})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: integer},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql int naturalNumber negative error', t => {
	const integer = -10

	generateGraphql({integer: intFormat({naturalNumber: true})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "integer" has invalid value "-10". Expected natural number, found: -10',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql int notZero', t => {
	const integer = 1

	generateGraphql({integer: intFormat({notZero: true})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: integer},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql int notZero error', t => {
	const integer = 0

	generateGraphql({integer: intFormat({notZero: true})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "integer" has invalid value "0". Expected non-zero, found: 0',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql int min', t => {
	const integer = 10

	generateGraphql({integer: intFormat({min: 10})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: integer},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql int min error', t => {
	const integer = 9

	generateGraphql({integer: intFormat({min: 10})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "integer" has invalid value "9". Expected minimum value of 10, found: 9',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql int max', t => {
	const integer = 10

	generateGraphql({integer: intFormat({max: 10})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: integer},
				errors: schema.undef
			}, result)
			t.end()
		})
		.catch(t.end)
})

test('graphql int max error', t => {
	const integer = 11

	generateGraphql({integer: intFormat({max: 10})}, integer)
		.then(result => {
			schema.test(t, {
				data: {input: null},
				errors: [
					{
						message: 'Argument "integer" has invalid value "11". Expected maximum value of 10, found: 11',
						locations: [{line: schema.naturalNumber, column: schema.naturalNumber}],
						path: ['input']
					}
				]
			}, result)
			t.end()
		})
		.catch(t.end)
})
