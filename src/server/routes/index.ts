import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

// controllers
import { CityController } from '../controllers';

const router = Router();

router.get('/api/health', (_, response) => {
    return response.status(StatusCodes.OK).json('Relax, I\'m healthy! :)');
});

// city routes
router.post('/api/city', CityController.createValidation, CityController.create);

export { router };
