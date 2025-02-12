import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';

import User from '../user/user.model.js';

const getUsersFromDB = async () => {
  const users = await User.find();
  if (!users) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return users;
};
const getOneUserFromDB = async id => {
  const users = await User.findOne({ _id: id });
  if (!users) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return users;
};
const updateUserInDB = async (id, payload) => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return result;
};
const banUserInDB = async id => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    { role: 'banned' },
    {
      new: true,
    },
  );
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return result;
};

const getMyProfileFromDB = async id => {
  const result = await User.findOne({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get profile');
  }
  return result;
};

export const UserServices = {
  getUsersFromDB,
  getOneUserFromDB,
  updateUserInDB,

  getMyProfileFromDB,
  banUserInDB,
};
