import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { AiDescriptionValidation } from './ai.validation.js';
import { AiController } from './ai.controller.js';


const router = express.Router();
router
  .post(
    '/description/generate',
    validateRequest(AiDescriptionValidation.generateDescriptionZodSchema),
    AiController.generateDescription,
  )
  

export const AiGenerate = router;