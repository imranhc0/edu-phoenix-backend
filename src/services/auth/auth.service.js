/* eslint-disable no-console */
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import { jwtHelpers } from '../../helpers/jwtHelpers.js';
import config from '../../config/index.js';
import User from '../user/user.model.js';
import { USER_ROLES } from '../../constants/index.js';
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

  const { _id: userId, role, isVerified } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role, isVerified },
    config.jwt.secret,
    config.jwt.expires_in,
  );
  const refreshToken = jwtHelpers.createToken(
    { userId, role, isVerified },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const signupUser = async payload => {
  const data = { ...payload, role: USER_ROLES.UNVERIFIED };
  const createdUser = await User.create(data);
  if (!createdUser)
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Failed to signup');
  return createdUser;
};
const forgetPassword = async (payload, userId) => {
  const response = await User.findOne({ _id: userId });

  if (!response)
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find the user');
  response.password = payload.password;
  response.save();
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
    {
      _id: isUserExist._id,
      role: isUserExist.role,
      isVerified: isUserExist.isVerified,
    },
    config.jwt.secret,
    config.jwt.expires_in,
  );
  return {
    accessToken: newAccessToken,
  };
};

const generateOTP = async payload => {
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  const response = await User.findOneAndUpdate(
    { email: payload.email },
    { oneTimePassword: otp },
  );
  if (!response)
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to find user');
};
const verfiyOTP = async (otp, email) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (!user.oneTimePassword)
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, "OTP didn't generate");
  if (user.oneTimePassword === otp) {
    user.isVerified = true;
    user.role = USER_ROLES.USER;
    user.oneTimePassword = null;
    user.save();
    const newAccessToken = jwtHelpers.createToken(
      {
        _id: user._id,
      },
      config.jwt.secret,
      config.jwt.expires_in,
    );
    return { accessToken: newAccessToken };
  }
  throw new ApiError(httpStatus.UNAUTHORIZED, "OTP didn't matched");
};

export const AuthServices = {
  loginUser,
  signupUser,
  forgetPassword,
  getAccessTokenFromDB,
  verfiyOTP,
  generateOTP,
};
