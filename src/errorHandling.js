const flatenErrors = errors => {
	if (Array.isArray(errors)) {
		return errors
			.reduce((all, val) => {
				if (Array.isArray(val)) {
					return [...all, ...flatenErrors(val)]
				}
				return [...all, val]
			}, [])
			.filter(val => val !== null)
	}

	if (errors !== null) {
		return [errors]
	}

	return null
}

const formatErrors = errors => {
	const localErrors = flatenErrors(errors)

	if (localErrors.length === 1) {
		return localErrors[0]
	} else if (localErrors.length > 0) {
		return localErrors
	}

	return null
}

module.exports = {
	flatenErrors,
	formatErrors
}
