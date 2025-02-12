/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import User from '../models/user.model';

const loginUser = async loginData => {
  const { email, password } = loginData;
  const isUserExist = await User.isUserExist(email, 'email');
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find user');
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret,
    config.jwt.expires_in,
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async token => {};
const signupUser = async payload => {
  const createdUser = await User.create(payload);
  if (!createdUser)
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Failed to signup');
  return createdUser;
};
const forgetPassword = async (payload, userId) => {
  const response = await User.findAndUpdate({ _id: userId }, payload);
  if (!response)
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find the user');
};
const getAccessTokenFromDB = async token => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifyToken;
  const isUserExist = await User.isUserExist(userId, '_id');
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = jwtHelpers.createToken(
    { _id: isUserExist._id, role: isUserExist.role },
    config.jwt.secret,
    config.jwt.expires_in,
  );
  return {
    accessToken: newAccessToken,
  };
};
const verfiyOTP = async () => {
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(token, config.jwt.refresh_secret);
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }
  const { userId } = verifyToken;
  const isUserExist = await User.isUserExist(userId, '_id');
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = jwtHelpers.createToken(
    { _id: isUserExist._id, role: isUserExist.role },
    config.jwt.secret,
    config.jwt.expires_in,
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthServices = {
  loginUser,
  signupUser,
  forgetPassword,
  getAccessTokenFromDB,
};
