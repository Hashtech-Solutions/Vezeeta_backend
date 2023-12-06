import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      // Set the filename to be unique (you can use a library like uuid here)
      cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });


export default upload;