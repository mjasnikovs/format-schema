import {
	isObject,
	isUndefined,
	isEmpty,
	inEnum,
	isString,
	isBoolean,
	isZero,
	isInteger,
	isNaturalNumber,
	isMaxNumber,
	isMinNumber,
	isLatitude,
	isLongitude
} from '../validators'

import {
	NAMESPACE_DEFAULT_NAME,
	IFormatInputOptions,
	defaultFormatOptions,
	postgresDataTypes,
	IPgOutputType
} from '../types'

interface IIntegerOptions {
	// validate
	notUndef?: boolean,
	notEmpty?: boolean,
	notZero?: boolean,
	enum?: number[] | false,
	min?: number | false,
	max?: number | false,
	positive?: boolean,
	naturalNumber?: boolean,
	latitude?: number | false,
	longitude?: number | false,
	pgType?: postgresDataTypes
}

interface IIntegerConfig extends IIntegerOptions {
	name: string
}

const defaultIntegerOptions: IIntegerConfig = {
	// config
	name: NAMESPACE_DEFAULT_NAME,
	// validate
	notUndef: false,
	notEmpty: false,
	notZero: false,
	enum: false,
	min: false,
	max: false,
	positive: false,
	naturalNumber: false,
	latitude: false,
	longitude: false,
	pgType: 'int'
}

const integerTest = (
	value: any,
	config: IIntegerConfig,
	options: IFormatInputOptions = defaultFormatOptions
): null | undefined | Error | number | IPgOutputType => {
	if (config.notUndef === false && config.notEmpty === false) {
		if (typeof value === 'undefined') {
			if (options.outputType === 'POSTGRES') {
				return {
					value: undefined,
					key: options.key,
					type: config.pgType
				}
			}
			return
		}
	}

	if (config.notUndef === true) {
		if (isUndefined(value)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${value}". Expected integer, found undefined value.`)
		}
	}

	if (config.notEmpty === false && value === null) {
		if (options.outputType === 'POSTGRES') {
			return {
				value: null,
				key: options.key,
				type: config.pgType
			}
		}
		return null
	}

	if (config.notEmpty === true && isEmpty(value)) {
		return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${value}". Expected non-empty integer, found "${value}".`)
	}

	const integer = typeof value === 'number' ? value : Number(value)

	if (!isInteger(integer)) {
		return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected integer, found "${integer}".`)
	}

	if (config.naturalNumber === true) {
		if (!isNaturalNumber(integer)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected natural number, found "${integer}".`)
		}
	}

	if (config.notZero === true) {
		if (isZero(integer)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected non-zero integer, found "${integer}".`)
		}
	}

	if (config.enum !== false && typeof config.enum !== 'undefined') {
		if (!inEnum(integer, config.enum)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected one of integer values "${config.enum}", found "${integer}".`)
		}
	}

	if (config.max !== false && typeof config.max !== 'undefined') {
		if (!isMaxNumber(integer, config.max)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected maximal value "${config.max}", found "${integer}".`)
		}
	}

	if (config.min !== false && typeof config.min !== 'undefined') {
		if (!isMinNumber(integer, config.min)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected minimal value "${config.min}", found "${integer}".`)
		}
	}

	if (config.positive === true) {
		if (integer < 0) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected positive float, found "${integer}".`)
		}
	}

	if (config.latitude === true) {
		if (!isLatitude(integer)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected latitude, found "${integer}".`)
		}
	}

	if (config.longitude === true) {
		if (!isLongitude(integer)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${integer}". Expected longitude, found "${integer}".`)
		}
	}

	if (options.outputType === 'POSTGRES') {
		return {
			value: integer,
			key: options.key,
			type: config.pgType
		}
	}

	return integer
}

export default (options?: IIntegerOptions) => {
	if (typeof options !== 'undefined' && !isObject(options)) {
		throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`)
	}

	const config = {...defaultIntegerOptions, ...options}

	const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultIntegerOptions).indexOf(key) === -1)

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

	if (config.enum !== false) {
		if (!Array.isArray(config.enum)) {
			throw new Error(`Format configuration error. "enum" param has invalid value "${config.enum}". Expected false or array, found "${config.enum}".`)
		}

		const invalidEnum = config.enum.find(val => isInteger(val) === false)

		if (typeof invalidEnum !== 'undefined') {
			throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with integers, found "[${config.enum}]".`)
		}
	}

	if (config.min !== false && !isInteger(config.min)) {
		throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or integer, found "${config.min}".`)
	}

	if (config.max !== false && !isInteger(config.max)) {
		throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or integer, found "${config.max}".`)
	}

	if (!isBoolean(config.notZero)) {
		throw new Error(`Format configuration error. "notZero" param has invalid value "${config.notZero}". Expected boolean, found "${config.notZero}".`)
	}

	if (!isBoolean(config.naturalNumber)) {
		throw new Error(`Format configuration error. "naturalNumber" param has invalid value "${config.naturalNumber}". Expected boolean, found "${config.naturalNumber}".`)
	}

	if (!isBoolean(config.positive)) {
		throw new Error(`Format configuration error. "positive" param has invalid value "${config.positive}". Expected boolean, found "${config.positive}".`)
	}

	if (!isBoolean(config.latitude)) {
		throw new Error(`Format configuration error. "latitude" param has invalid value "${config.latitude}". Expected boolean, found "${config.latitude}".`)
	}

	if (!isBoolean(config.longitude)) {
		throw new Error(`Format configuration error. "longitude" param has invalid value "${config.longitude}". Expected boolean, found "${config.longitude}".`)
	}

	return (value: any, privateOptions: IFormatInputOptions) =>
		integerTest(value, config, privateOptions)
}
