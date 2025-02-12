import { Schema, model } from 'mongoose';

import config from '../../config/index.js';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'unverified', 'banned'],
    },

    profileImage: { type: String },

    oneTimePassword: { type: String },
    bio: { type: String },

    address: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExist = async function (value, field) {
  return await User.findOne(
    { [field]: value },
    { _id: 1, password: 1, role: 1, contactNo: 1 },
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword,
  savedPassword,
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};
const User = model('User', userSchema);
export default User;
