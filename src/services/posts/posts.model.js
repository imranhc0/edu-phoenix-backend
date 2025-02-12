import { Schema, model } from 'mongoose';

const postsSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    upvote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    downvote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    verificationScore: {
      type: Number,
    },
    crimeTime: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    flagged: {
      type: Boolean,
    },
    anonymous: {
      type: Boolean,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comments',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Posts = model('Posts', postsSchema);
export default Posts;
