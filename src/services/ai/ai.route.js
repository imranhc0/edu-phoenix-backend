import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { AiValidation } from '../validations/ai.validation';
import { AiController } from './ai.controller';


const router = express.Router();
router
  .post(
    '/description/generate',
    validateRequest(AiDescriptionValidation.generateDescriptionZodSchema),
    AiController.generateDescription,
  )
  

export const AiGenerate = router;