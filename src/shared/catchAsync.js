// catchAsync is a function that wraps an Express middleware function to catch any errors that might occur
// and pass them to the next middleware function in the stack.
const catchAsync = fn => async (req, res, next) => {
  try {
    // Attempt to execute the wrapped middleware function
    await fn(req, res, next);
  } catch (error) {
    // If an error occurs, pass it to the next middleware function in the stack
    next(error);
  }
};

export default catchAsync;
