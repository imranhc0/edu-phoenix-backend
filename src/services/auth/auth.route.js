import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { AuthValidation } from './auth.validation.js';
import { AuthController } from './auth.controller.js';

const router = express.Router();
router
  .post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser,
  )
  .post(
    '/signup',
    validateRequest(AuthValidation.signupZodSchema),
    AuthController.signupUser,
  )
  .patch(
    '/forget-password',
    validateRequest(AuthValidation.forgetPasswordZodSchema),
    AuthController.forgetPassword,
  )
  .post(
    '/accessToken',
    validateRequest(AuthValidation.accessTokenZodSchema),
    AuthController.getAccessToken,
  )
  .post(
    '/verify',
    validateRequest(AuthValidation.verifyOTPSchema),
    AuthController.verfiyOTP,
  )
  .post(
    '/generate-otp',
    validateRequest(AuthValidation.generateOTPZodSchema),
    AuthController.generateOTP,
  );

export const AuthRoutes = router;
