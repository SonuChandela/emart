const generateSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/'+/g, '')
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export { generateSlug };