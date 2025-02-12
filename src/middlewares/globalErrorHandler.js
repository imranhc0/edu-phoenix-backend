import handleValidationError from '../errors/handleValidationError.js';
import ApiError from '../errors/ApiError.js';
import config from '../config/index.js';

const globalErrorHandler = (error, req, res, next) => {
  //   if (config.env === 'development') console.log('Global Error', error);
  //   else errorLogger.error('Global Error ', error);
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages = [];
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};
export default globalErrorHandler;
