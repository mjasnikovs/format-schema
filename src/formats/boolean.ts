const {
	NAMESPACE_DEFAULT_NAME
} = require('../types')

import {
	isUndefined,
	isEmpty,
	isString,
	isBoolean,
	isObject
} from '../validators'

interface IBooleanOptions {
	// validate
	notUndef?: boolean,
	notEmpty?: boolean
}

interface IBooleanConfig extends IBooleanOptions {
	name: string
}

const defaultBooleanOptions: IBooleanConfig = {
	// config
	name: NAMESPACE_DEFAULT_NAME,

	// validate
	notUndef: false,
	notEmpty: false
}

const booleanTest = (
	value: any,
	config: IBooleanConfig,
	namespace?: string
): null | undefined | Error | boolean => {
	if (config.notUndef === false && config.notEmpty === false) {
		if (typeof value === 'undefined') {
			return
		}
	}

	if (config.notUndef === true) {
		if (isUndefined(value)) {
			return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected boolean, found undefined value.`)
		}
	}

	if (config.notEmpty === false && value === null) {
		return null
	}

	if (config.notEmpty === true) {
		if (isEmpty(value)) {
			return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected non-empty boolean, found "${value}".`)
		}
	}

	if (!isBoolean(value)) {
		return new Error(`Format error. "${namespace || config.name}" has invalid value "${value}". Expected boolean, found "${value}".`)
	}

	return value
}

export default (options?: IBooleanOptions) => {
	if (typeof options !== 'undefined' && !isObject(options)) {
		throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`)
	}

	const config = {...defaultBooleanOptions, ...options}

	const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultBooleanOptions).indexOf(key) === -1)

	if (typeof invalidConfigKey !== 'undefined') {
		throw new Error(`Format configuration error. Configuration is invalid, param "${invalidConfigKey}" not found. Expected valid configuration object, found invalid key "${invalidConfigKey}".`)
	}

	if (!isString(config.name)) {
		throw new Error(`Format configuration error. "name" param has invalid value "${config.name}". Expected string, found "${config.name}".`)
	}

	if (!isBoolean(config.notUndef)) {
		throw new Error(`Format configuration error. "notUndef" param has invalid value "${config.notUndef}". Expected boolean, found "${config.notUndef}".`)
	}

	if (!isBoolean(config.notEmpty)) {
		throw new Error(`Format configuration error. "notEmpty" param has invalid value "${config.notEmpty}". Expected boolean, found "${config.notEmpty}".`)
	}

	return (value: any, namespace?: string) =>
		booleanTest(value, config, namespace)
}
