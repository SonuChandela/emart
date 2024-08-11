import path from 'path';

const generateImgNewPath = (image, prodName) => {
    const extension = path.extname(image.originalname);
    const newFilename = `${prodName.toLowerCase().replace(/'+/g, '').replace(/\s+/g, '-')}-${image.fieldname}-${Math.round(Math.random() * 10)}${extension}`;
    return path.join('./public/temp', newFilename);
}

export default generateImgNewPath;