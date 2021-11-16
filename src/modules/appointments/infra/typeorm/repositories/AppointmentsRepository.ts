import Appointment from "../entities/appointment";
import { getRepository, Repository} from 'typeorm';

import ICreateAppoitmentDTO from "@modules/appointments/dtos/ICeateAppointmentDTO";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

class AppointmentsRepository implements IAppointmentsRepository    {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    // execute(arg0: { date: Date; provider_id: any; }) {
    //     throw new Error("Method not implemented.");

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppontment = await this.ormRepository.findOne({
            where: {date},
        });

        return findAppontment;
    }

    public async create({provider_id, date}: ICreateAppoitmentDTO ): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    };
}

export default AppointmentsRepository;
