export const NAMESPACE_DEFAULT_NAME = 'NAMESPACE_DEFAULT_NAME'

export const MAX_INT = 2147483647
export const MIN_INT = -2147483648

export type postgresDataTypes =
	'bigint' |
	'int8' |
	'bigserial' |
	'serial8' |
	'bit' |
	'bit varying' |
	'varbit' |
	'boolean' |
	'bool' |
	'box' |
	'bytea' |
	'character' |
	'character varying' |
	'character varying[]' |
	'char' |
	'varchar' |
	'cidr' |
	'circle' |
	'date' |
	'double precision' |
	'float8' |
	'inet' |
	'int' |
	'int4' |
	'interval' |
	'json' |
	'jsonb' |
	'line' |
	'lseg' |
	'macaddr' |
	'money' |
	'numeric' |
	'decimal' |
	'path' |
	'pg_lsn' |
	'point' |
	'polygon' |
	'real' |
	'float4' |
	'smallint' |
	'int2' |
	'smallserial' |
	'serial2' |
	'serial' |
	'serial4' |
	'text' |
	'time' |
	'time without time zone' |
	'time with time zone' |
	'timetz' |
	'timestamp without time zone' |
	'timestamp with time zone' |
	'timestamptz' |
	'tsquery' |
	'tsvector' |
	'txid_snapshot' |
	'uuid' |
	'xml' |
	undefined

export interface IFormatInputOptions {
	namespace?: string,
	outputType: 'OBJECT' | 'POSTGRES',
	key: string | number | 'NAMESPACE_DEFAULT_NAME'
}

export interface IPgOutputType {
	value: string | number | undefined | null,
	key: string | number
	type: postgresDataTypes
}

export const defaultFormatOptions: IFormatInputOptions = {
	namespace: undefined,
	outputType: 'OBJECT',
	key: NAMESPACE_DEFAULT_NAME
}
