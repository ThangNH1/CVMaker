import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
export enum Dest {
  Profile = './upload/avatar',
  Somthingelse = './upload/random',
}
// Multer upload options
export const multerOptions = (destination: Dest) => {
  // Check the mimetypes to allow for upload
  return {
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(
          new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
    // Storage properties
    storage: diskStorage({
      // Destination storage path details
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = destination;
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
          console.log('not exsit');
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      // File modification details
      filename: (req: any, file: any, cb: any) => {
        // Calling the callback passing the random name generated with the original extension name
        cb(null, generateFilename(file));
      },
    }),
  };
};
function generateFilename(file) {
  return `${Date.now()}.${file.originalname}`;
}
