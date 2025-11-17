import { Router } from 'express';
import {checkJWT} from '../middleware/identification/jwt.js'
import { uploadPhoto } from '../middleware/photo/upload.js';
import {
  updateUser,
  deleteUser,
  createUser,
  getUsers,
  getOwnUser
} from "../controller/clientController.js";

import {clientValidatorMiddleware} from '../middleware/validation.js';

import {isSameUser} from '../middleware/identification/user.js'

import {mustBeAdmin} from '../middleware/identification/mustBeAdmin.js'


const router = Router();




router.post("/", clientValidatorMiddleware.addClientValidator, uploadPhoto, createUser); 
router.get("/me", checkJWT, getOwnUser);    
router.get("/", checkJWT,mustBeAdmin, getUsers);      
router.patch("/", checkJWT, isSameUser, clientValidatorMiddleware.updateClientValidator , updateUser);     
router.delete("/:id", checkJWT, isSameUser, deleteUser);       

export default router;


