import { z } from 'zod';

const generateDescriptionZodSchema = z.object({
  body: z.object({
    imageURL: z.string({
      required_error: 'Image URL is required',
    }),
  }),
});

export const AiDescriptionValidation = {
    generateDescriptionZodSchema
};
