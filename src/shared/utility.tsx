export const updateObject = (object: object, properties: object) => {
    return {
        ...object,
        ...properties,
    }
};
