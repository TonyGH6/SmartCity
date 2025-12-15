import express from "express";
import { requestReset, resetPassword } from "../controller/adminResetController.js";

const router = express.Router();

router.post("/password-reset-request", requestReset);
router.post("/password-reset", resetPassword);

export default router;


