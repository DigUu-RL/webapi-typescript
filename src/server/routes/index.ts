import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/api/health', (request, response) => {
    return response.status(StatusCodes.OK).json('Relax, I\'m healthy! :)');
});

export { router };
