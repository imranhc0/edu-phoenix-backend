import { z } from 'zod';

const createPostZodSchema = z.object({
  body: z.object({
    description: z.string(),
    title: z.string(),
    image: z.string().optional(),
    video: z.string().optional(),
    crimeTime: z.string(),
    district: z.string(),
    division: z.string(),
    anonymous: z.boolean(),
  }),
});
const updatePostsZodSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    title: z.string().optional(),
    image: z.string().optional(),
    video: z.string().optional(),
    crimeTime: z.string().optional(),
    district: z.string().optional(),
    division: z.string().optional(),
    anonymous: z.boolean().optional(),
  }),
});

export const PostsValidation = {
  createPostZodSchema,
};
