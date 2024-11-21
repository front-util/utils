import { isObject } from "./check";

export const downloadByUrl = (filename: string, url: string) => {
    const link = document.createElement('a');

    link.download = filename;
    link.href = url;
    link.click();
};

export const downloadLocalFile = (filename: string, file: File) => {
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);

    downloadByUrl(filename, url);
};

const convertObjectToJSON = (value: object) => JSON.stringify(value);

export const encodeQueryParams = (params?: object): URLSearchParams | null => {
    if(!params) {
        return null;
    }
    const searchParams = new URLSearchParams();

    try {
        Object.entries(params).forEach(([key, queryValue]) => {
            let value;

            if(Array.isArray(queryValue)) {
                const isPrimitive = queryValue.every((val) => !isObject(val));

                if(isPrimitive) {
                    value = queryValue.toString();
                } else {
                    value = convertObjectToJSON(queryValue);
                }
            } else {
                value = isObject(queryValue) ? convertObjectToJSON(queryValue) : String(queryValue);
            }
            searchParams.append(key, value);
        });
    } catch(error) {
        console.error(error);
    }
    return searchParams;
};