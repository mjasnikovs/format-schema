import {
	isObject,
	isUndefined,
	isEmpty,
	inEnum,
	isString,
	isBoolean,
	isLatitude,
	isLongitude,
	isZero,
	isFloat,
	isMaxNumber,
	isMinNumber
} from '../validators'

import {
	NAMESPACE_DEFAULT_NAME,
	IFormatInputOptions,
	defaultFormatOptions,
	postgresDataTypes,
	IPgOutputType
} from '../types'

interface IFloatOptions {
	// validate
	notUndef?: boolean,
	notEmpty?: boolean,
	notZero?: boolean,
	enum?: number[] | false,
	min?: number | false,
	max?: number | false,
	positive?: boolean,
	latitude?: number | false,
	longitude?: number | false,
	pgType?: postgresDataTypes
}

interface IFloatConfig extends IFloatOptions {
	name: string
}

const defaultFloatOptions: IFloatConfig = {
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
	latitude: false,
	longitude: false,
	pgType: 'numeric'
}

const floatTest = (
	value: any,
	config: IFloatConfig,
	options: IFormatInputOptions = defaultFormatOptions
): null | undefined | Error | number | IPgOutputType=> {
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
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${value}". Expected float, found undefined value.`)
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

	if (config.notEmpty === true) {
		if (isEmpty(value)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${value}". Expected non-empty float, found "${value}".`)
		}
	}

	const float = typeof value === 'number' ? value : Number(value)

	if (!isFloat(float)) {
		return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected float, found "${float}".`)
	}

	if (config.notZero === true) {
		if (isZero(float)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected non-zero float, found "${float}".`)
		}
	}

	if (config.enum !== false && typeof config.enum !== 'undefined') {
		if (!inEnum(float, config.enum)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected one of float values "${config.enum}", found "${float}".`)
		}
	}

	if (config.max !== false && typeof config.max !== 'undefined') {
		if (!isMaxNumber(float, config.max)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected maximal value "${config.max}", found "${float}".`)
		}
	}

	if (config.min !== false && typeof config.min !== 'undefined') {
		if (!isMinNumber(float, config.min)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected minimal value "${config.min}", found "${float}".`)
		}
	}

	if (config.positive === true) {
		if (float < 0) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected positive float, found "${float}".`)
		}
	}

	if (config.latitude === true) {
		if (!isLatitude(float)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected latitude, found "${float}".`)
		}
	}

	if (config.longitude === true) {
		if (!isLongitude(float)) {
			return new Error(`Format error. "${options.namespace || config.name}" has invalid value "${float}". Expected longitude, found "${float}".`)
		}
	}

	if (options.outputType === 'POSTGRES') {
		return {
			value: float,
			key: options.key,
			type: config.pgType
		}
	}

	return float
}

export default (options?: IFloatOptions) => {
	if (typeof options !== 'undefined' && !isObject(options)) {
		throw new Error(`Format configuration error. Configuration is invalid. Expected object, found "${options}".`)
	}

	const config = {...defaultFloatOptions, ...options}

	const invalidConfigKey = Object.keys(config).find(key => Object.keys(defaultFloatOptions).indexOf(key) === -1)

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

		const invalidEnum = config.enum.find(val => isFloat(val) === false)

		if (typeof invalidEnum !== 'undefined') {
			throw new Error(`Format configuration error. "enum" param has invalid value "[${config.enum}]". Expected array with floats, found "[${config.enum}]".`)
		}
	}

	if (config.min !== false && !isFloat(config.min)) {
		throw new Error(`Format configuration error. "min" param has invalid value "${config.min}". Expected false or float, found "${config.min}".`)
	}

	if (config.max !== false && !isFloat(config.max)) {
		throw new Error(`Format configuration error. "max" param has invalid value "${config.max}". Expected false or float, found "${config.max}".`)
	}

	if (!isBoolean(config.notZero)) {
		throw new Error(`Format configuration error. "notZero" param has invalid value "${config.notZero}". Expected boolean, found "${config.notZero}".`)
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
		floatTest(value, config, privateOptions)
}
