import Router from 'express';
import {getCategories, createTypeProduct, updateTypeProduct, deleteTypeProduct} from '../controller/productTypeController.js';
import {checkJWT} from '../middleware/identification/jwt.js'
import {mustBeAdmin} from '../middleware/identification/mustBeAdmin.js'
import {categoryProductValidatorMiddleware} from '../middleware/validation.js';


const router = Router();

router.get('/',checkJWT,mustBeAdmin, getCategories);

router.post('/', checkJWT,mustBeAdmin,categoryProductValidatorMiddleware.createCategoryProductValidator,createTypeProduct);
router.patch('/',checkJWT,mustBeAdmin,categoryProductValidatorMiddleware.updateCategoryProductValidator, updateTypeProduct);
router.delete('/',checkJWT,mustBeAdmin, deleteTypeProduct);


export default router;

