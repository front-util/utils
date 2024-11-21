export const getImageMeta = async (url: string) => {
    const img = new Image();

    img.src = url;
    await img.decode();
    return {
        naturalHeight: img.naturalHeight,
        naturalWidth : img.naturalWidth,
    };
};

export const getImageMetaFromFile = (file: File) => getImageMeta(window.URL.createObjectURL(file));
