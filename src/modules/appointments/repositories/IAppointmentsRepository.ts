import Appointment from '@modules/appointments/infra/typeorm/entities/appointment';
import ICreateAppoitmentDTO from '../dtos/ICeateAppointmentDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppoitmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}
