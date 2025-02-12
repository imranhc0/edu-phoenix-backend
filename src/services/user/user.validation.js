import { z } from 'zod';

const updateUserZodSchema = z.object({
  body: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    contactNo: z.string().optional(),
    address: z
      .object({
        house: z.string().optional(),
        block: z.string().optional(),
        ward: z.string().optional(),
        road: z.string().optional(),
        zip: z.string().optional(),
        city: z.string().optional(),
      })
      .optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  updateUserZodSchema,
};
