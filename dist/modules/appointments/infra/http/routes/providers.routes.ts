import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticaded from "../../../../users/infra/http/middlewares/EnsureAuthenticaded";
import ProvidersController from "../controllers/ProvidersController";
import ProviderDayAvaliabilityController from "../controllers/ProviderDayAvaliabilityController";
import ProviderMonthAvaliabilityController from "../controllers/ProviderMonthAvaliabilityController";


const providersRouter = Router();
const providersController = new ProvidersController();
const dayAvaliabilityController = new ProviderDayAvaliabilityController();
const monthAvaliabilityController = new ProviderMonthAvaliabilityController();


providersRouter.use(ensureAuthenticaded);

providersRouter.get('/', providersController.index);

providersRouter.get('/:provider_id/month-avaliability',
celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}), monthAvaliabilityController.index);

providersRouter.get('/:provider_id/day-avaliability',
celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required(),
    }
}), dayAvaliabilityController.index);


export default providersRouter;
