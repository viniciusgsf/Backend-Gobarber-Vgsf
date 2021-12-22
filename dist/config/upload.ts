import path from 'path';
import crypto from 'crypto';
import multer, {StorageEngine} from "multer";

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    directory: string;
    driver: 'disk' | 's3';

    tmpFolder: string;
    uploadsFolder: string;

    config: {
        disk: {
            storage: StorageEngine;
            aws: {
                bucket: string;
            }
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,

    directory: tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

        disk: {
            storage: multer.diskStorage({
                destination: tmpFolder,
                filename(request, file, callback) {
                    const fileHash = crypto.randomBytes(10).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        },

    config: {
        multer: {},
        aws: {
            bucket: 'app-gobarber',
        }
    },
} as unknown as IUploadConfig;
