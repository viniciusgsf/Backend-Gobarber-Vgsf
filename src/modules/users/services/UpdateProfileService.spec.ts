

import AppError from '@shared/errors/AppError';
// import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
            fakeUsersRepository = new FakeUsersRepository();
            fakeHashProvider = new FakeHashProvider();

            updateProfile = new UpdateProfileService(
                fakeUsersRepository,
                fakeHashProvider
            );
  });
    it('should be able update profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhon@gmail.com',
            password: '123456'
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Tres',
            email: 'jhonTres@gmail.com'
        });

        expect(updatedUser.name).toBe('Jhon Tres');
        expect(updatedUser.email).toBe('jhonTres@gmail.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhon@gmail.com',
            password: '123456'
        });
        const user = await fakeUsersRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456'
        });

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'Jhon doe',
            email: 'jhon@gmail.com'
        })).rejects.toBeInstanceOf(AppError);

    });

});
