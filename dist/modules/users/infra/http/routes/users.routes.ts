import { request, response, Router } from "express";
import multer from "multer";
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";
import ensureAuthenticaded from "../middlewares/EnsureAuthenticaded";
import uploadConfig from "../../../../../config/upload";



const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.config.disk);


interface UserResponse {
    name: string;
    email: string;
}


usersRouter.post('/',celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}),  usersController.create);

usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), userAvatarController.update,);

export default usersRouter;
