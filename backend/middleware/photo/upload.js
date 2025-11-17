import multer from 'multer';
import path from 'path'; // ⬅️ Import du module 'path'


const UPLOAD_DIR = path.join(path.resolve(), 'public', 'uploads'); 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext); 
        
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

export const uploadPhoto = multer({ storage: storage }).single('photo');