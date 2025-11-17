import Router  from 'express';
import userRouter from './clientRoute.js';
import postRouter from './postRoute.js';
import reservationRouter from './reservationRoute.js';
import {getAllCities} from '../controller/addressController.js';
import {login} from '../controller/loginController.js'
import {checkJWT} from '../middleware/identification/jwt.js'
import { mustBeAdmin } from '../middleware/identification/mustBeAdmin.js';
import {clientValidatorMiddleware} from '../middleware/validation.js';
import { getAllStats } from '../controller/dashboardController.js';
import productTypeRouter from './productTypeRoute.js'

const router = Router();

router.use('/users', userRouter);
router.use('/posts', checkJWT, postRouter);
router.use('/reservations', checkJWT, reservationRouter);
router.post('/login',clientValidatorMiddleware.loginValidator, login)
router.get('/stats',checkJWT, mustBeAdmin , getAllStats)
router.get('/getAllCities', getAllCities);
router.use('/productType', productTypeRouter);
export default router;