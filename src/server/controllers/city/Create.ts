import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

interface ICity {
    name: string,
    state: string
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICity>(yup.object().shape({
        name: yup.string().required(),
        state: yup.string().min(2).max(2).required()
    }))
}));

export const create = async (request: Request<{}, {}, ICity>, response: Response) => {
    return response.status(StatusCodes.CREATED).json(request.body);
};
