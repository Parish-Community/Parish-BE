import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary.res';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve({ data: result, status: 200 });
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  uploadOtherFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    console.log(file);
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        file.originalname,
        { resource_type: 'raw' },
        (error: any, result: CloudinaryResponse) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }
}
