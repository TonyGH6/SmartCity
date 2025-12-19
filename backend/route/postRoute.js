import { Router } from 'express';
import { getPostsMap, getPostsHotspots } from "../controller/postMapController.js";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  searchPostByCategory
} from '../controller/postController.js';

import {checkJWT} from '../middleware/identification/jwt.js'
import {postValidatorMiddleware} from '../middleware/validation.js';
import { mustBeAdmin } from '../middleware/identification/mustBeAdmin.js';
import { orMiddleware } from '../middleware/utils/orMiddleware.js';

import {postOwner} from '../middleware/identification/postOwner.js';


const router = Router();

router.post("/", checkJWT, postValidatorMiddleware.createPostValidator, createPost);           
router.get("/byCategory", searchPostByCategory); 
router.get("/", checkJWT, mustBeAdmin, getPosts);
router.get("/map", checkJWT, mustBeAdmin, getPostsMap);
router.get("/hotspots", checkJWT, mustBeAdmin, getPostsHotspots);
router.get("/:id", getPost);     
router.patch("/:id", checkJWT, orMiddleware(postOwner, mustBeAdmin), postValidatorMiddleware.updatePostValidator, updatePost);     
router.delete("/:id", checkJWT, orMiddleware(postOwner, mustBeAdmin), deletePost);      

export default router;
