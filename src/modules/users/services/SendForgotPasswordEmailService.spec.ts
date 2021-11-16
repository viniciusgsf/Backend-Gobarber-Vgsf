

import AppError from '@shared/errors/AppError';
// import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from "@shared/container/providers/MailProvider/Fakes/FakeMailProvider";
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgorPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgorPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
            fakeUsersRepository = new FakeUsersRepository();
            fakeMailProvider = new FakeMailProvider();
            fakeUserTokensRepository = new FakeUserTokensRepository();

            const sendForgotPasswordEmail = new SendForgorPasswordEmailService(
                fakeUsersRepository,
                fakeMailProvider,
                fakeUserTokensRepository
            );
  });
  it('should be able to recover password', async () => {
        const sendMail =  jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456'
        });

        await sendForgotPasswordEmail.execute({
        email: 'jhon@gmail.com',
        });

        expect(sendMail).toHaveBeenCalled();
        });

  it('should not be able to recover the password of a not existant user', async () => {
    const sendMail =  jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
        sendForgotPasswordEmail.execute({
            email: 'jhon@gmail.com',
         }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('it should generate a forgot password token', async () => {
    const generateToken =  jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456'
    });

    await sendForgotPasswordEmail.execute({
       email: 'jhon@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

});
