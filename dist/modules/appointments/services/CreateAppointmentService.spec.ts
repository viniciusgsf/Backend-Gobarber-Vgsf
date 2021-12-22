import AppError from '@shared/errors/AppError';
import CreateAppointmentService from "./CreateAppointmentServices";
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'
import FakeNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';


let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        createAppointment = new CreateAppointmentService(
        fakeAppointmentRepository,
        fakeNotificationsRepository,
        fakeCacheProvider
        );
    })
  it('should be able to create a new appointment', async () => {


    const appointment = await createAppointment.execute({
        date: new Date(),
        provider_id: '123456789',
        user_id: '123456'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create 2 appointments at the same time', async() => {
    const appointmentDate = new Date(2021, 11, 2, 13);

    await createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789',
        user_id: '123456'
    });

    await expect(
        createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456789',
            user_id: '123456'
        })
    ).rejects.toBeInstanceOf(AppError);
  });

    it('should not be able to create a appointment on a past date', async() => {
       jest.spyOn(Date, 'now').mockImplementationOnce(() => {
           return new Date(2021, 10, 21, 13).getTime();
       });

       await expect(
           createAppointment.execute({
               date: new Date(2021, 10, 21, 12),
               user_id: '123456',
               provider_id: '123456789',
           }),
       ).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to create a appointment with same user as provider', async() => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 10, 21, 13).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 10, 21, 12),
                user_id: '123456',
                provider_id: '123456789',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
