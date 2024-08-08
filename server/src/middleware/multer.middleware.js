import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = `temp-${Math.round(Math.random() * 1E9)}${extension}`;
        cb(null, filename);
    }
})  

export const upload = multer({
    storage,
})