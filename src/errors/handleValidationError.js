// Import IGenericErrorResponse for error response structure

// Function to handle mongoose validation errors and return a formatted error response
const handleValidationError = (
  error, // The validation error to be handled
) => {
  // Map over the error's errors object to extract path and message for each error
  const errors = Object.values(error.errors).map(el => {
    return { path: el?.path, message: el?.message }; // Return an object with path and message for each error
  });
  // Define the HTTP status code for the error response
  const statusCode = 400;
  // Return the formatted error response
  return {
    statusCode,
    message: 'Validation Error', // General error message
    errorMessages: errors, // Array of specific error messages
  };
};
// Export the handleValidationError function for external use
export default handleValidationError;
