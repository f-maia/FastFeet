import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        const name = res.toString('hex') + extname(file.originalname);

        if (err) return cb(err, name);

        return cb(null, name);
      });
    },
  }),
};
