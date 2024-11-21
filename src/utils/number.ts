import { isNumber, isUndefined, isString } from "./check";

export const numberTo2SignString = (number?: number) => {
    if(!number || !isNumber(number)) {
        return '00';
    }
    const num = Math.abs(number);
    const sign = Math.sign(number) < 0 ? '-' : '';

    return num < 10 ? `${sign}0${num}` : `${number}`;
};

export function numberWithSpaces(value: number, separator?: string): string {
    if(typeof value !== 'number') {
        return value;
    }
    const [intPart, floatPart] = value.toString().split('.');

    const strNumberWithSpaces = Number(intPart).toLocaleString('ru') + (floatPart ? `.${floatPart}` : '');

    if(!isUndefined(separator)) {
        return strNumberWithSpaces.replaceAll(' ', separator); // заменяет \&nbsp;
    }

    return strNumberWithSpaces;
}

export const getNumberFromStringWithSpaces = (spacesString: string) => {
    if(!isString(spacesString)) {
        return spacesString;
    }
    const val = Number(spacesString.replace(/\s/g, ''));

    return Number.isNaN(val) ? 0 : val;
};