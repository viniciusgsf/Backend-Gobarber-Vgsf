import { Router } from "express";

import ensureAuthenticaded from "../../../../users/infra/http/middlewares/EnsureAuthenticaded";
import AppointmentsController from "../controllers/AppointmentsController";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();


appointmentsRouter.use(ensureAuthenticaded);

// appointmentsRouter.get('/',  async (request, response) => {
//     const appointmentsRepository = getCustomRepository(AppointmentRepository);
//     const appointments = await appointmentsRepository.find();

//     return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);


export default appointmentsRouter;
