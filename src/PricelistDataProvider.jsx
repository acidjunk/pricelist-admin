import simpleRestProvider from "ra-data-simple-rest";

const pricelistDataProvider = {
    ...simpleRestProvider,
    update: (resource, params) => {
        if (resource !== "kind-images" || !params.data.image_1) {
            // fallback to the default implementation
            return simpleRestProvider.update(resource, params);
        }
        /**
         * For posts update only, convert uploaded image in base 64 and attach it to
         * the `picture` sent property, with `src` and `title` attributes.
         */

        // Freshly dropped pictures are File objects and must be converted to base64 strings
        const newPictures = params.data.image_1.filter(p => p.rawFile instanceof File);
        const formerPictures = params.data.image_1.filter(p => !(p.rawFile instanceof File));

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures =>
                base64Pictures.map(picture64 => ({
                    src: picture64,
                    title: `${params.data.title}`
                }))
            )
            .then(transformedNewPictures =>
                simpleRestProvider.update(resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image_1: [...transformedNewPictures, ...formerPictures]
                    }
                })
            );
    }
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

export default pricelistDataProvider;
