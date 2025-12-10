import { Router } from 'express';
import { requestReset, resetPassword } from '../controller/adminResetController.js';

const router = Router();

router.post('/password-reset-request', requestReset);

router.post('/password-reset', resetPassword);

export default router;

