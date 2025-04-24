import { Base64String } from "../types";

export const isEqual2Files = (file1: File, file2: File) => {
    return file1.name === file2.name && file1.size === file2.size && file1.type === file2.type;
};

export const base64ToBytesBuffer = (base64: Base64String) => {
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));

    return bytes.buffer;
};

export const fileToBase64 = async (file: File): Promise<{result?: Base64String | null; error: null}> => {
    try {
        const result: Base64String | null = await new Promise((resolve, reject) => {
            if(!file.size) {
                throw new Error('empty file');
            }
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as Base64String);
            reader.onerror = (error) => reject(error);
        });

        return {
            result,
            error: null,
        };
    } catch(error) {
        return {
            result: null,
            error : error as null,
        };
    }
};

export const base64ToFile = ({ base64File, type, name, }: {base64File: Base64String, type: string, name?: string}) => {
    const fileName = name?.includes(type) ? name : `${name ?? ''}.${type}`;

    return new File([base64File], fileName, { type: `image/${type}`, });
};

export const getBodyFromBase64 = (base64String: string) => {
    return base64String.split(',')[1] ?? base64String;
};

export const getBase64BodyFromFile = async (file: File) => {
    const { result, } = await fileToBase64(file);

    return result ? getBodyFromBase64(result) : undefined;
};