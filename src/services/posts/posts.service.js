import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError.js';
import { postSearchableFields } from '../../constants/index.js';
import Posts from '../posts/posts.model.js';
import { paginationHelpers } from '../../helpers/paginationHelpers.js';
const createPostInDB = async payload => {
  const post = await Posts.create(payload);
  if (!post) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return post;
};
const getAllPostsFromDB = async (filters, paginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { query, ...filteringData } = filters;
  const andCondtion = [];
  if (query) {
    andCondtion.push({
      $or: postSearchableFields.map(field => ({
        [field]: {
          $regex: query,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filteringData).length) {
    andCondtion.push({
      $and: Object.entries(filteringData).map(([field, value]) => {
        if (field === 'minYear')
          return { ['publication_year']: { $gte: parseInt(value) } };
        else if (field === 'maxYear')
          return { ['publication_year']: { $lte: parseInt(value) } };
        else
          return {
            [field]: value,
          };
      }),
    });
  }
  const sortConditions = {};
  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder;
  const whereCondition = andCondtion.length > 0 ? { $and: andCondtion } : {};
  const total = await Posts.countDocuments();

  const result = await Posts.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit === 0 ? total : limit);
  //   if(limit===0){

  //    result = await Posts.find(whereCondition)
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(total);
  // }else {
  //   result = await Posts.find(whereCondition)
  //  .sort(sortConditions)
  //  .skip(skip)
  //  .limit(total);

  // }
  return {
    meta: {
      page,
      limit: limit === 0 ? total : limit,
      total,
    },
    data: result,
  };
};
const getOnePostFromDB = async id => {
  const posts = await Posts.findOne({ _id: id });
  if (!posts) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrived');
  return posts;
};
const updatePostInDB = async (id, userId, payload) => {
  const isUserPost = await Posts.find({ _id: id, userId });
  if (!isUserPost) throw new ApiError(httpStatus.BAD_REQUEST, 'Not your post');
  const result = await Posts.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update');
  return result;
};
const upvoteInDB = async (id, userId) => {
  const isUserUpvoted = await Posts.find({
    _id: id,
    $or: { upvote: { $in: userId }, downvote: { $in: userId } },
  });
  if (!isUserUpvoted)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already Upvoted');
  const upvoted = await Posts.findOneAndUpdate({
    _id: id,
    upvote: { $push: userId },
  });
  if (!upvoted) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to  Upvote');
};
const downvoteInDB = async (id, userId) => {
  const isUserUpvoted = await Posts.find({
    _id: id,
    $or: { upvote: { $in: userId }, downvote: { $in: userId } },
  });
  if (!isUserUpvoted)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already Downvoted');
  const upvoted = await Posts.findOneAndUpdate({
    _id: id,
    downvote: { $push: userId },
  });
  if (!upvoted) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to  Upvote');
};
const deletePostFromDB = async (id, userId, payload) => {
  const isUserPost = await Posts.delete({ _id: id, userId });
  if (!isUserPost) throw new ApiError(httpStatus.BAD_REQUEST, 'Not your post');
  const result = await Posts.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update');
  return result;
};

export const PostsServices = {
  createPostInDB,
  getAllPostsFromDB,
  getOnePostFromDB,
  updatePostInDB,
  deletePostFromDB,
  upvoteInDB,
  downvoteInDB,
};
