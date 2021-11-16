

import AppError from '@shared/errors/AppError';
// import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from '../services/ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
    beforeEach(() => {
            fakeUsersRepository = new FakeUsersRepository();
            fakeUserTokensRepository = new FakeUserTokensRepository();
            fakeHashProvider = new FakeHashProvider();

            resetPassword = new ResetPasswordService(
                fakeUsersRepository,
                fakeUserTokensRepository,
                fakeHashProvider
            );
  });
    it('should be able to reset password', async () => {
        const user = await fakeUsersRepository.create({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456'
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
        password: '123123',
        token,
        });
        const updateUser = await fakeUserTokensRepository.findById(user.id)

        expect(updateUser?.password).toBe('123123');
        });

    it('shouldnt be able to reset password with missing token', async () => {
        const { token } = await fakeUsersRepository.generate(
            'non-existing-user',
        )

        await expect(
            resetPassword.execute({
                token,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('shouldnt be able to reset password after expired time limit', async () => {
        const user = await fakeUsersRepository.create({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456'
        });

        const {token} = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3 );
        })

        await expect(resetPassword.execute({
            password: '123123',
            token,
            })).rejects.toBeInstanceOf(AppError);
        });
});
