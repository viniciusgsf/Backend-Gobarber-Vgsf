import "reflect-metadata";
import "dotenv/config";

import express, {Request, Response, NextFunction} from "express";
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';

import uploadConfig from "../../../config/upload";
import AppError from "../../errors/AppError";
import '../database';
import '@shared/infra/database';
import '@shared/container';
import rateLimiter from "./middlewares/rateLimiter";
import routes from "./routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
// app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request:Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        if (!Error && response.statusCode == 200) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        // return response.status(err.statusCode).json({
        //     status: 'error',
        //     message: err.message,
        // });
    }
    console.log(err)
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
        })

    },
);

app.listen(3333, () => {
    console.log('🪓 Server started on port 3333')
});
