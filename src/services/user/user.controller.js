import catchAsync from '../../shared/catchAsync.js';
import sendResponse from '../../shared/sendResponse.js';
import { UserServices } from './user.service.js';
import httpStatus from 'http-status';
const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrived successfully!!!',
    data: result,
  });
});
const getOneUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getOneUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived successfully!!!',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await UserServices.updateUserInDB(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!!!',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await UserServices.getMyProfileFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrived successfully!!!",
    data: result,
  });
});
const banUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await UserServices.banUserInDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrived successfully!!!",
    data: result,
  });
});

export const UserController = {
  getUsers,
  getOneUser,
  updateUser,
  getMyProfile,
  banUser,
};
