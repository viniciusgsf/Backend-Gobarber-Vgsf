import AppError from '@shared/errors/AppError';
import AuthenticateUserService from "./AuthenticateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
        fakeUsersRepository,
        fakeHashProvider
        );
    })
  it('should not be able to authenticate with non existing user', async () => {

    await expect( authenticateUser.execute({
      email: 'jhon@gmail.com',
      password: '123456'
   })).rejects.toBeInstanceOf(AppError);

  });

  it('shouldn t be able to authenticate with wrong password', async () => {

    await createUser.execute({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456'
     })

    await expect(
        authenticateUser.execute({
            email: 'jhon@gmail.com',
            password: 'worng-password'
         }),
    ).rejects.toBeInstanceOf(AppError);

        });
    });
