export const isString = (value:unknown):value is string => typeof value === 'string';

export const isBoolean = (value:unknown):value is boolean => typeof value === 'boolean';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (value:unknown):value is Function => typeof value === 'function';

export const isAsyncFunction = (value: unknown): boolean => isFunction(value) && value.constructor.name === 'AsyncFunction';

export const isNull = (value:unknown):value is null => value === null;

export const isNullOrUndefined = (value:unknown):value is null | undefined => value == null;

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isObjectType = (value:unknown):boolean => typeof value === 'object';

export const isObject = <T extends object>(value:unknown):value is T => !isNullOrUndefined(value)
    && !Array.isArray(value)
    && isObjectType(value)
    && !(value instanceof Date)
    && !(value instanceof Map)
    && !(value instanceof Set);

export const isUndefined = (val:unknown):val is undefined => val === undefined;
