import { uuid } from "uuidv4";

import { isEqual, getMonth, getYear, getDate } from "date-fns";
import Appointment from "@modules/appointments/infra/typeorm/entities/appointment";

import ICreateAppoitmentDTO from "@modules/appointments/dtos/ICeateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import IFindAllInMonthFromProviderDTO from "@modules/appointments/dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointments/dtos/IFindAllInDayFromProviderDTO";

class AppointmentRepository implements IAppointmentsRepository    {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
       const findAppointment = this.appointments.find(
           appointment => isEqual(appointment.date, date) &&
           appointment.provider_id == provider_id,
       );

       return findAppointment;
    };
    public async findAllInMonthFromProvider({provider_id, month, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter( appointment=>
            appointment.provider_id == provider_id &&
            getMonth(appointment.date) +1 == month &&
            getYear(appointment.date) == year
        );

        return appointments;
     };

     public async findAllInDayFromProvider({provider_id, day, month, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter( appointment=>
            appointment.provider_id == provider_id &&
            getDate(appointment.date) == day &&
            getMonth(appointment.date) +1 == month &&
            getYear(appointment.date) == year
        );

        return appointments;
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
