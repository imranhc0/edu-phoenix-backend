/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';

import { AiServices } from '../services/ai.service';

const generateDescription = catchAsync(async (req, res) => {
    const { imageURL } = req.body;
    const result = await AiServices.generateDescription(imageURL);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in succesfully',
    data: result,
  });
});


export const AiController = {
  generateDescription,
};
