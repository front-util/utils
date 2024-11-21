import { ObserverInstance, RandomMinMaxProps, Subscriber } from "../types";

export function uuid():string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
         
        const v = c === 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);
    });
}

export const declOfNum = (number: number, decls: string[] = []) => {
    const intNumber = Math.abs(number) % 100;
    const lastNumber = intNumber % 10;

    if((intNumber > 10) && (intNumber < 20)) {
        return decls[2];
    }
    if(lastNumber > 1 && lastNumber < 5) {
        return decls[1];
    }
    if(lastNumber === 1) {
        return decls[0];
    }
    return decls[2];
};

export const iteratorToList = <T = unknown>(iterable: IterableIterator<T>) => {
    const results: T[] = [];

    let iterator = iterable.next();

    while(!iterator.done) {
        results.push(iterator.value);
        iterator = iterable.next();
    }

    return results;
};

export const createObserver = <D>(): ObserverInstance<D> => {
    const subscribers: Subscriber<D>[] = [];

    const unsubscribe = (subscriber: Subscriber<D>) => {
        return subscribers.filter((sub) => sub !== subscriber);
    };

    const subscribe = (subscriber: Subscriber<D>) => {
        subscribers.push(subscriber);

        return () => {
            unsubscribe(subscriber);
        };
    };

    const notify = (payload: D) => {
        subscribers.forEach((subscriber) => subscriber(payload));
    };

    return {
        subscribe,
        notify,
    };
};

export const randomIntMinMax = ({
    min = 0,
    max = 10,
}:RandomMinMaxProps = {}):number => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
};

export const replaceSearchMatch = (reqex: RegExp, value?: string) => {
    if(!value) {
        return value;
    }
    return value.replace(reqex, '<b>$1</b>');
};

export const createSafetyRegString = (str: string) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

export const safeHandleDecorate = <T extends unknown[], R>(operation: (...args: T) => R): (...args: T) => [Error | null, R | null] => {
    return (...args: T): [Error | null, R | null] => {
        try {
            const result = operation(...args);

            return [null, result];
        } catch(error) {
            return [error as Error, null];
        }
    };
};

export const safeHandleDecorateAsync = <T extends unknown[], R>(operation: (...args: T) => Promise<R>): (...args: T) => Promise<[Error | null, R | null]> => {
    return async (...args: T): Promise<[Error | null, R | null]> => {
        try {
            const result = await operation(...args);

            return [null, result];
        } catch(error) {
            return [error as Error, null];
        }
    };
};