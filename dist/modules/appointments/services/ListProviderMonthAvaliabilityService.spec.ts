import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService'

let listProviderMonthAvaliability: ListProviderMonthAvaliabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository

describe('ListProviderMonthAvaliability', () => {
    beforeEach(() => {
        listProviderMonthAvaliability = new ListProviderMonthAvaliabilityService(
            fakeAppointmentRepository
        );
        fakeAppointmentRepository = new FakeAppointmentRepository();
  });
    it('should be able to list if provider is avaliable', async () => {
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 20, 8, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 20, 10, 0, 0),
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 21, 8, 0, 0),
        });

        const avaliability = await listProviderMonthAvaliability.execute({
            provider_id: 'user',
            year: 2021,
            month: 5,
        });

        expect(avaliability).toEqual(expect.arrayContaining([
            {day: 19, avaliable: true },
            {day: 20, avaliable: false },
            {day: 21, avaliable: false },
            {day: 22, avaliable: true },
        ]));

    });

});
