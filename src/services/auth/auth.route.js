import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { AuthValidation } from '../validations/auth.validation';
import { AuthController } from '../controllers/auth.controller';

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
    validateRequest(AuthValidation.accessTokenSchema),
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

export const AuthRoute = router;
