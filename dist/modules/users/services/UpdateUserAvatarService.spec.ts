import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/storageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;


describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
      beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider
        );
      });

    const user = await FakeUsersRepository.create({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456'
    })

    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should be able to create a new user', async () => {

    expect(updateUserAvatar.execute({
        user_id: 'non-existing user',
        avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should delete old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await FakeUsersRepository.create({
        name: 'Jhon Doe',
        email: 'jhon@gmail.com',
        password: '123456'
    })

    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar.jpg'
    })
    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenLastCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });


});
