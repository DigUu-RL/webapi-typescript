import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { Request, Response } from 'express';

interface IQueryProps {
    page?: number,
    quantity?: number,
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().moreThan(0).optional(),
        quantity: yup.number().moreThan(10).optional(),
        filter: yup.string().optional()
    }))
}));

export const getAll = async (request: Request<{}, {}, {}, IQueryProps>, response: Response) => {
    
};
