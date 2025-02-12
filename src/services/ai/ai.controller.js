/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../shared/catchAsync.js';
import sendResponse from '../../shared/sendResponse.js';
import { AiServices } from './ai.service.js';

const generateDescription = catchAsync(async (req, res) => {
    const { imageURL } = req.body;
    let result = await AiServices.generateDescription(imageURL);
    try {
        result = result.choices[0].message.content
        result = JSON.parse(result.replace(/\\n/g, '').replace(/\\/g, ''));
    }catch (error) {
        console.log(error);
    } finally {
        sendResponse(res, {
          statusCode: 200,
          success: true,
          message: 'User logged in succesfully',
          data: result,
        });
    }

});


export const AiController = {
  generateDescription,
};