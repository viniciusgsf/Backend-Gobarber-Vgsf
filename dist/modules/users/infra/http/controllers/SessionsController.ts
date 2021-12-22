import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

export default class SessionsController {
    public async create (request: Request, response: Response): Promise<Response> {
        const { email, password} = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        const respUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at

        }

        return response.json({ user: respUser, token });
    }
}
