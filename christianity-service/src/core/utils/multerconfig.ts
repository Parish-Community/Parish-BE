import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

export const multerConfig = {
  dest: '../../assets/upload',
};

export const multerOptions = {
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (_req: any, file: any, callback: any) => {
    if (file.mimetype.match('jpg|jpeg|png|gif|pdf|msg|eml|docx|doc|xlsx|xls')) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: multerConfig.dest,
    filename(_, file, callback) {
      return callback(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
