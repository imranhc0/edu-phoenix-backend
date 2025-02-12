import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { UserValidation } from './user.validation.js';
import { UserController } from './user.controller.js';
import { USER_ROLES } from '../../constants/index.js';
import auth from '../../middlewares/auth.js';
const router = express.Router();
router
  .get(
    '/my-profile',
    auth(USER_ROLES.USER, USER_ROLES.UNVERIFIED, USER_ROLES.ADMIN),
    UserController.getMyProfile,
  )
  .patch(
    '/:id',
    auth(USER_ROLES.ADMIN, USER_ROLES.UNVERIFIED, USER_ROLES.USER),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUser,
  )
  .get('/all', auth(USER_ROLES.ADMIN), UserController.getUsers)
  .get(
    '/:id',
    auth(USER_ROLES.ADMIN, USER_ROLES.UNVERIFIED, USER_ROLES.USER),
    UserController.getOneUser,
  )
  .patch('/ban/:id', UserController.banUser);

export const UserRoutes = router;
