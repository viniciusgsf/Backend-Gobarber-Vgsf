import { request, response, Router } from "express";
import multer from "multer";
import { container } from "tsyringe";

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";
import ensureAuthenticaded from "../middlewares/EnsureAuthenticaded";
import uploadConfig from "../../../../../config/upload";



const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);


interface UserResponse {
    name: string;
    email: string;
}


usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), userAvatarController.update,);

export default usersRouter;
