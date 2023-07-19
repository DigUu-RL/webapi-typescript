import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ICity {
    name: string
}

export const create = (request: Request<{}, {}, ICity>, response: Response) => {
    const data: ICity = request.body;

    console.log(data);

    return response.send(StatusCodes.CREATED);
};
