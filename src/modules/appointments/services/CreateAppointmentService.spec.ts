

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from "./CreateAppointmentServices";
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        createAppointment = new CreateAppointmentService(
        fakeAppointmentRepository,
        );
    })
  it('should be able to create a new appointment', async () => {


    const appointment = await createAppointment.execute({
        date: new Date(),
        provider_id: '123456789',
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create 2 appointments at the same time', async() => {
    const appointmentDate = new Date(2021, 11, 2, 13);

    await createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789',
    });

    expect(
        createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456789',
        })
    ).rejects.toBeInstanceOf(AppError);

  });
});
