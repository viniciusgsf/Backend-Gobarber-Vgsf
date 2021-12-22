import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProviderMonthAvaliabilityService from "@modules/appointments/services/ListProviderMonthAvaliabilityService";

export default class ProviderMonthAvaliabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year} = request.query;

        const listProviderMonthAvaliability = container.resolve(ListProviderMonthAvaliabilityService);

        const avaliability =  await listProviderMonthAvaliability.execute({
            provider_id,
            month: Number(month),
            year: Number(year)
         });

        // console.log(avaliability);
        return response.json(avaliability);
    }
}
