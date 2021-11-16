// import path from 'path';
// import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';


interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfile {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}


    public async execute({user_id, name, email}: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found');
        }

        user.name = name;
        user.email = email;

        return this.usersRepository.save(user);
        }
    }

export default UpdateProfile;
