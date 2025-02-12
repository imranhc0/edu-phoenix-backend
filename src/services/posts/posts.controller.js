import catchAsync from '../../shared/catchAsync.js';
import { PostsServices } from './posts.service.js';
import sendResponse from '../../shared/sendResponse.js';
import httpStatus from 'http-status';
import pick from '../../shared/pick.js';
import { paginationFields } from '../../config/index.js';
const getPosts = catchAsync(async (req, res) => {
  const filters = pick(req.query, [
    'division',
    'district',
    'minVerficationScore',
    'maxVerficationScore',
  ]);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PostsServices.getAllPostsFromDB(
    filters,
    paginationOptions,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrived successfully!!!',
    data: result,
  });
});
const getOnePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PostsServices.getOnePostFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrived successfully!!!',
    data: result,
  });
});
const createPost = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const payload = { ...req.body, userId };
  const result = await PostsServices.createPostInDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully!!!',
    data: result,
  });
});
const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await PostsServices.updatePostInDB(id, userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully!!!',
    data: result,
  });
});
const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const result = await PostsServices.deletePostFromDB(id, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully!!!',
    data: result,
  });
});

export const PostsController = {
  createPost,
  getPosts,
  getOnePost,
  updatePost,
  deletePost,
};
