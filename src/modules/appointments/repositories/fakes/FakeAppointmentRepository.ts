import { uuid } from "uuidv4";

import { isEqual } from "date-fns";
import Appointment from "@modules/appointments/infra/typeorm/entities/appointment";

import ICreateAppoitmentDTO from "@modules/appointments/dtos/ICeateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

class AppointmentRepository implements IAppointmentsRepository    {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
       const findAppointment = this.appointments.find(
           appointment => isEqual(appointment.date, date),
       );

       return findAppointment;

    };

    public async create({provider_id, date}: ICreateAppoitmentDTO ): Promise<Appointment> {
       const appointment = new Appointment();

    //    Object.assign(appointment, { id: uuid(), date, provider_id });

       appointment.id = uuid();
       appointment.date = date;
       appointment.provider_id = provider_id;

       this.appointments.push(appointment);

       return appointment;
    };
}

export default AppointmentRepository;
