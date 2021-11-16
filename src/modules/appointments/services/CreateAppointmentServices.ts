import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";

import Appointment from "../infra/typeorm/entities/appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import AppError from '../../../shared/errors/AppError';

interface IRequest {
    provider_id: string,
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}


    public async execute({date, provider_id}: IRequest): Promise<Appointment> {


        const appointmentDate = startOfHour(date);

        const findAppontmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate

        );

        if (findAppontmentInSameDate) {
            throw AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({provider_id, date: appointmentDate,});



        return appointment;
    }
}

export default CreateAppointmentService;
