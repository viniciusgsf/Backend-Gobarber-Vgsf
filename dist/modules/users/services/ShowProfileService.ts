// import path from 'path';
// import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';


interface IRequest {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}


    public async execute({user_id,}: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found');
        }

    return user;
        }
    }

export default ShowProfileService;
