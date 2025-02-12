/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';

import { AuthServices } from '../services/auth.service';

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthServices.loginUser(loginData);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in succesfully',
    data: others,
  });
});
const signupUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signupUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User signedup in succesfully',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reseted succesfully',
    data: null,
  });
});
const getAccessToken = catchAsync(async (req, res) => {
  const result = await AuthServices.getAccessTokenFromDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access Token succesfully got',
    data: result,
  });
});
const generateOTP = catchAsync(async (req, res) => {
  const result = await AuthServices.generateOTP(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP generated succesfully',
    data: null,
  });
});
const verfiyOTP = catchAsync(async (req, res) => {
  const result = await AuthServices.verfiyOTP(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP verified succesfully',
    data: null,
  });
});

export const AuthController = {
  loginUser,
  signupUser,
  forgetPassword,
  getAccessToken,
  verfiyOTP,
};
