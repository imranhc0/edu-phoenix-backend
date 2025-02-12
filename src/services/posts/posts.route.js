import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { PostsValidation } from './posts.validation.js';
import { PostsController } from './posts.controller.js';
import { USER_ROLES } from '../../constants/index.js';
import auth from '../../middlewares/auth.js';
const router = express.Router();
router

  .post(
    '/',
    auth(USER_ROLES.USER, USER_ROLES.UNVERIFIED, USER_ROLES.ADMIN),
    validateRequest(PostsValidation.createPostZodSchema),
    PostsController.createPost,
  )
  .get('/', PostsController.getPosts)
  .patch(
    '/:id',
    auth(USER_ROLES.USER),
    validateRequest(PostsValidation.updatePostsZodSchema),
    PostsController.updatePost,
  )
  .delete('/:id', auth(USER_ROLES.USER), PostsController.deletePost);

export const PostsRoutes = router;
