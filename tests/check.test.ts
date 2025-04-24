import {describe, it, expect} from 'vitest';

import {
    isString,
    isBoolean,
    isAsyncFunction,
    isFunction,
    isNull,
    isNullOrUndefined,
    isNumber,
    isObject,
    isUndefined
} from '../src/utils/check';

describe('[utils/check]', () => {
    describe('[utils/isString]', () => {
        it('test string', () => {
            expect(isString('')).toBeTruthy();
        });
        it('test object', () => {
            expect(isString({})).toBeFalsy();
        });
    });

    describe('[utils/isBoolean]', () => {
        it('test string', () => {
            expect(isBoolean('asdf')).toBeFalsy();
        });
    
        it('test bool', () => {
            expect(isBoolean(true)).toBeTruthy();
        });
    
        it('test num', () => {
            expect(isBoolean(1)).toBeFalsy();
        });
    
        it('test object', () => {
            expect(isBoolean({})).toBeFalsy();
        });
    });

    describe('- isFunction', () => {
        it('success test', () => {
            expect(isFunction(() => '')).toBeTruthy();
        });

        it('failed test object', () => {
            expect(isFunction({})).toBeFalsy();
        });

        it('failed test undefined', () => {
            expect(isFunction(undefined)).toBeFalsy();
        });
    });

    describe('- isAsyncFunction', () => {
        it('success test', () => {
            expect(isAsyncFunction(async () => '')).toBeTruthy();
        });

        it('failed test sync function', () => {
            expect(isAsyncFunction(() => '')).toBeFalsy();
        });

        it('failed test object', () => {
            expect(isAsyncFunction({})).toBeFalsy();
        });

        it('failed test undefined', () => {
            expect(isAsyncFunction(undefined)).toBeFalsy();
        });
    });

    describe('[utils/isNull]', () => {
        it('test string', () => {
            expect(isNull('asdf')).toBeFalsy();
        });
    
        it('test null', () => {
            expect(isNull(null)).toBeTruthy();
        });
    
        it('test "0"', () => {
            expect(isNull(0)).toBeFalsy();
        });
    
        it('test empty string', () => {
            expect(isNull('')).toBeFalsy();
        });
    });

    describe('[utils/isNullOrUndefined]', () => {
        it('test undefined', () => {
            expect(isNullOrUndefined(undefined)).toBeTruthy();
        });
    
        it('test null', () => {
            expect(isNullOrUndefined(null)).toBeTruthy();
        });
    
        it('test empty string', () => {
            expect(isNullOrUndefined('')).toBeFalsy();
        });
    
        it('test "0"', () => {
            expect(isNullOrUndefined(0)).toBeFalsy();
        });
    });

    describe('[utils/isNumber]', () => {
        it('test float', () => {
            expect(isNumber(3.4)).toBeTruthy();
        });
    
        it('test int', () => {
            expect(isNumber(0)).toBeTruthy();
        });
    
        it('test string', () => {
            expect(isNumber('0')).toBeFalsy();
        });
    
        it('test null', () => {
            expect(isNumber(null)).toBeFalsy();
        });
    });

    describe('[utils/isObject]', () => {
        it('test array', () => {
            expect(isObject([])).toBeFalsy();
        });
    
        it('test object', () => {
            expect(isObject({})).toBeTruthy();
        });
    
        it('test date', () => {
            expect(isObject(new Date())).toBeFalsy();
        });
    
        it('test Map', () => {
            expect(isObject(new Map())).toBeFalsy();
        });
    
        it('test Set', () => {
            expect(isObject(new Set())).toBeFalsy();
        });
    });

    describe('[utils/isUndefined]', () => {
        it('test undefined', () => {
            expect(isUndefined(undefined)).toBeTruthy();
        });
        it('test object', () => {
            expect(isUndefined({})).toBeFalsy();
        });
    
        it('test null', () => {
            expect(isUndefined(null)).toBeFalsy();
        });
    
        it('test string', () => {
            expect(isUndefined(''))
                .toBeFalsy();
        });
    });
});
