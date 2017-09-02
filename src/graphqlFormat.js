const {GraphQLError} = require('graphql')

const {
	format
} = require('./format')

module.exports = (schema, values) =>
	new Promise((resolve, reject) => {
		const result = format(schema, values)

		if (result instanceof Error) {
			return reject(new GraphQLError(result.message))
		}

		return resolve(result)
	})
