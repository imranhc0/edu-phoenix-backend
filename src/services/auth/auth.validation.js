import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),

    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const signupZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First Name is required',
    }),
    lastName: z.string({
      required_error: 'Last Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),

    phone: z.string({
      required_error: 'Phone Number is required',
    }),
  }),
});
const forgetPasswordZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'New Password is required',
    }),
  }),
});
const accessTokenZodSchema = z.object({
  body: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
const verifyOTPSchema = z.object({
  body: z.object({
    otp: z.string({
      required_error: 'otp is required',
    }),
  }),
});
const generateOTPZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});
export const AuthValidation = {
  loginZodSchema,
  signupZodSchema,
  forgetPasswordZodSchema,
  accessTokenZodSchema,
  verifyOTPSchema,
  generateOTPZodSchema,
};
