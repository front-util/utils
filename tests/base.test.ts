import {describe, it, expect, mock} from 'bun:test';

import {
    uuid,
    declOfNum,
    randomIntMinMax,
    replaceSearchMatch,
    safeHandleDecorate,
    safeHandleDecorateAsync,
    shallowCompare
} from '#src/base';

describe('[utils/base]', () => {
    describe('[utils/crypto]', () => {
        it('success test', () => {
            expect(uuid().length).toEqual(36);
        });
    });

    describe('[utils/declOfNum]', () => {
        // Returns the correct declension for numbers ending in 1
        it('should return the correct declension when the number ends in 1', () => {
            const number = 1;
            const decls = ['apple', 'apples', 'apples'];
            const result = declOfNum(number, decls);
    
            expect(result).toBe('apple');
        });
    
        // Returns the correct declension for numbers ending in 2, 3, or 4
        it('should return the correct declension when the number ends in 2', () => {
            const number = 2;
            const decls = ['apple', 'apples', 'apples'];
            const result = declOfNum(number, decls);
    
            expect(result).toBe('apples');
        });
    
        // Returns the correct declension for numbers ending in 5, 6, 7, 8, or 9, or 0
        it('should return the correct declension when the number ends in 5', () => {
            const number = 5;
            const decls = ['apple', 'apples', 'apples'];
            const result = declOfNum(number, decls);
    
            expect(result).toBe('apples');
        });
    
        // Returns the correct declension for numbers ending in 11, 12, 13, or 14
        it('should return the correct declension when the number ends in 11', () => {
            const number = 11;
            const decls = ['apple', 'apples', 'apples'];
            const result = declOfNum(number, decls);
    
            expect(result).toBe('apples');
        });
    
        // Returns the correct declension for numbers between 10 and 20
        it('should return the correct declension when the number is between 10 and 20', () => {
            const number = 15;
            const decls = ['apple', 'apples', 'apples'];
            const result = declOfNum(number, decls);
    
            expect(result).toBe('apples');
        });
    
        // Returns the correct declension for numbers ending in 0
        it('should return the correct declension when the number ends in 0', () => {
            const number = 10;
            const decls = ['apple', 'apples', 'apples'];
            const result = declOfNum(number, decls);
    
            expect(result).toBe('apples');
        });
    });
    
    describe('[utils/randomIntMinMax]', () => {
        it('test default', () => {
            expect(randomIntMinMax() <= 10).toBeTruthy();
        });
    
        it('test {}', () => {
            expect(randomIntMinMax({}) <= 10).toBeTruthy();
        });
    
        it('test "{ min: 20, max: 22, }"', () => {
            const rand = randomIntMinMax({ min: 20, max: 22, });
    
            expect(rand <= 22).toBeTruthy();
            expect(rand >= 20).toBeTruthy();
        });
    });

    describe('[utils/regexp]', () => {
        const testReqExp = /(testvalue)/;

        it('check replaceSearchMatch', async () => {
            expect(replaceSearchMatch(testReqExp, 'some string with testvalue xxx')).toEqual('some string with <b>testvalue</b> xxx');
        });
    });

    describe('- safeHandleDecorate', () => {
        // Executes the operation and returns the result without errors
        it('should return result without errors when operation executes successfully', () => {
            const operation = (a: number, b: number) => a + b;
            const decoratedOperation = safeHandleDecorate(operation);
            const [error, result] = decoratedOperation(2, 3);
    
            expect(error).toBeNull();
            expect(result).toBe(5);
        });
    
        // Returns a tuple with null error and valid result for successful operations
        it('should return tuple with null error and valid result for successful operations', () => {
            const operation = () => 'success';
            const decoratedOperation = safeHandleDecorate(operation);
            const [error, result] = decoratedOperation();
    
            expect(error).toBeNull();
            expect(result).toBe('success');
        });
    
        // Handles operations that throw exceptions and returns the error
        it('should return error when operation throws an exception', () => {
            const operation = () => { throw new Error('Test error'); };
            const decoratedOperation = safeHandleDecorate(operation);
            const [error, result] = decoratedOperation();
    
            expect(error).toBeInstanceOf(Error);
            expect(error?.message).toBe('Test error');
            expect(result).toBeNull();
        });
    
        // Works with operations that have no arguments
        it('should work with operations that have no arguments', () => {
            const operation = () => 42;
            const decoratedOperation = safeHandleDecorate(operation);
            const [error, result] = decoratedOperation();
    
            expect(error).toBeNull();
            expect(result).toBe(42);
        });
    
        // Manages operations that return undefined or null
        it('should manage operations that return undefined or null', () => {
            const operationUndefined = () => undefined;
            const operationNull = () => null;
            const decoratedOperationUndefined = safeHandleDecorate(operationUndefined);
            const decoratedOperationNull = safeHandleDecorate(operationNull);
        
            const [errorUndefined, resultUndefined] = decoratedOperationUndefined();
            const [errorNull, resultNull] = decoratedOperationNull();
        
            expect(errorUndefined).toBeNull();
            expect(resultUndefined).toBeUndefined();
        
            expect(errorNull).toBeNull();
            expect(resultNull).toBeNull();
        });
    });
    
    describe('- safeHandleDecorateAsync', () => {
        // Returns a tuple with null error and result when operation succeeds
        it('should return a tuple with null error and result when operation succeeds', async () => {
            const operation = mock().mockResolvedValue('success');
            const decoratedOperation = safeHandleDecorateAsync(operation);
            const result = await decoratedOperation();
    
            expect(result).toEqual([null, 'success']);
        });
    
        // Handles asynchronous operations correctly and returns a promise
        it('should handle asynchronous operations and return a promise', async () => {
            const operation = mock().mockResolvedValue('async result');
            const decoratedOperation = safeHandleDecorateAsync(operation);
            const resultPromise = decoratedOperation();
    
            expect(resultPromise).toBeInstanceOf(Promise);
            const result = await resultPromise;
    
            expect(result).toEqual([null, 'async result']);
        });
    
        // Properly awaits the operation and returns the result
        it('should properly await the operation and return the result', async () => {
            const operation = mock().mockResolvedValue('awaited result');
            const decoratedOperation = safeHandleDecorateAsync(operation);
            const result = await decoratedOperation();
    
            expect(result).toEqual([null, 'awaited result']);
        });
    
        // Returns a tuple with error and null result when operation throws an error
        it('should return a tuple with error and null result when operation throws an error', async () => {
            const error = new Error('operation failed');
            const operation = mock().mockRejectedValue(error);
            const decoratedOperation = safeHandleDecorateAsync(operation);
            const result = await decoratedOperation();
    
            expect(result).toEqual([error, null]);
        });
    
        // Handles operations that return promises resolving to null or undefined
        it('should handle operations returning promises resolving to null or undefined', async () => {
            const operation = mock().mockResolvedValue(null);
            const decoratedOperation = safeHandleDecorateAsync(operation);
            const result = await decoratedOperation();
    
            expect(result).toEqual([null, null]);
        
            const operationUndefined = mock().mockResolvedValue(undefined);
            const decoratedOperationUndefined = safeHandleDecorateAsync(operationUndefined);
            const resultUndefined = await decoratedOperationUndefined();
    
            expect(resultUndefined).toEqual([null, undefined]);
        });
    
        // Manages operations with no arguments gracefully
        it('should manage operations with no arguments gracefully', async () => {
            const operation = mock().mockResolvedValue('no args');
            const decoratedOperation = safeHandleDecorateAsync(operation);
            const result = await decoratedOperation();
    
            expect(result).toEqual([null, 'no args']);
        });
    });

    // Generated by Qodo Gen

    describe('- shallowCompare', () => {
    // Compare two identical objects and return true
        it('should return true when comparing two identical objects', () => {
            const objA = { key1: 'value1', key2: 'value2', };
            const objB = { key1: 'value1', key2: 'value2', };
            const result = shallowCompare(objA, objB);

            expect(result).toBe(true);
        });

        // Compare an object with undefined and return false
        it('should return false when comparing an object with undefined', () => {
            const objA = { key1: 'value1', };
            const result = shallowCompare(objA, undefined);

            expect(result).toBe(false);
        });

        // Compare two different objects with the same keys and return false
        it('should return false when comparing two different objects with the same keys', () => {
            const objA = { key1: 'value1', key2: 'value2', };
            const objB = { key1: 'value1', key2: 'differentValue', };
            const result = shallowCompare(objA, objB);

            expect(result).toBe(false);
        });

        // Compare two null values and return true
        it('should return true when comparing two null values', () => {
            const result = shallowCompare(null, null);

            expect(result).toBe(true);
        });

        // Compare an object with null and return false
        it('should return false when comparing an object with null', () => {
            const objA = { key1: 'value1', };
            const result = shallowCompare(objA, null);

            expect(result).toBe(false);
        });

        it('should return false when comparing an different objects with same keys', () => {
            const objA = { key1: {testKey: 'key1',}, };
            const objB = { key1: {testKey: 'key1',}, };
            const result = shallowCompare(objA, objB);

            expect(result).toBe(false);
        });

        it('should return true when comparing an same objects with same keys', () => {
            const cmObj = {testKey: 'key1',};
            const objA = { key1: cmObj, };
            const objB = { key1: cmObj, };
            const result = shallowCompare(objA, objB);

            expect(result).toBe(true);
        });
    });
});