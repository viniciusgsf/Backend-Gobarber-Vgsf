

import AppError from '@shared/errors/AppError';
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );
    })
  it('should be able to create a new user', async () => {

    const user = await createUser.execute({
       name: 'Jhon Doe',
       email: 'jhon@gmail.com',
       password: '123456'
    })

    expect(user).toHaveProperty('id');
  });

  it('shouldn t be able to create a new user with the same email as other', async () => {

    await createUser.execute({
       name: 'Jhon Doe',
       email: 'jhon@gmail.com',
       password: '123456'
    })

    expect(
        createUser.execute({
            name: 'Jhon Doe',
            email: 'jhon@gmail.com',
            password: '123456'
         }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
