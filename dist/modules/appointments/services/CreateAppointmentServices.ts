import { startOfHour, isBefore, getHours, format } from "date-fns";
import { injectable, inject } from "tsyringe";

import Appointment from "../infra/typeorm/entities/appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

import AppError from '../../../shared/errors/AppError';
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";

interface IRequest {
    provider_id: string,
    user_id: string,
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}


    public async execute({date, provider_id, user_id}: IRequest): Promise<Appointment> {


        const appointmentDate = startOfHour(date);

        if(isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't creat a appointment on a past date");
        }
        if( user_id == provider_id) {
            throw new AppError("You can't create an appointment with another user");
        }
        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError("You need to use a valid date");
        }

        const findAppontmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id,

        );

        if (findAppontmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({provider_id, user_id, date: appointmentDate,});

        // const user = appointment.user;

        const dataFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento com para dia ${dataFormatted}`,
        });

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`
        )

        return appointment;
    }
}

export default CreateAppointmentService;
