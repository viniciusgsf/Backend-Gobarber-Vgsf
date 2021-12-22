import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'
import ListProviderAppointmentsService from './ListProvidersAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersAppointments', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointments = new ListProviderAppointmentsService(
        fakeAppointmentRepository,
        fakeCacheProvider
        );
    })
it('should be able to list providers appointments', async () => {

    const appointment1 = await fakeAppointmentRepository.create({
        provider_id: 'provider',
        user_id: '123456',
        date: new Date(2021, 22, 11, 10, 0, 0),
    })
    const appointment2 = await fakeAppointmentRepository.create({
        provider_id: 'provider',
        user_id: '123456',
        date: new Date(2021, 22, 11, 11, 0, 0),
    })

    const appointments = await listProviderAppointments.execute({
        provider_id: 'provider',
        year: 2021,
        month: 11,
        day: 22
    });
    expect(appointments).toEqual ([
        appointment1,
        appointment2
    ]);
});

});
