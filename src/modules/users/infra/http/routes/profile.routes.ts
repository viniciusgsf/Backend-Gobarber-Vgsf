import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticaded from "../middlewares/EnsureAuthenticaded";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticaded);

profileRouter.get('/', profileController.show);
profileRouter.put('/', celebrate({
    [Segments.PARAMS]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string(),
        password_confirmation: Joi.string().valid(Joi.ref('password')),
    }
}), profileController.update);


export default profileRouter;
