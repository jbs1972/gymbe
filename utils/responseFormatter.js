/**
 * Utility to format consistent JSON responses
 */

const formatResponse = (data = null, message = "", statusCode = 200, pagination = null) => {
  const response = {
    message,
    data,
    status: statusCode,
  };
  
  if (pagination) {
    response.pagination = pagination;
  }
  
  return response;
};

/**
 * Send a successful response
 */
const sendSuccess = (res, data, message = "Success", statusCode = 200, pagination = null) => {
  res.status(statusCode).json(formatResponse(data, message, statusCode, pagination));
};

/**
 * Send an error response
 */
const sendError = (res, message = "Something went wrong", error = null, statusCode = 500) => {
  res.status(statusCode).json({
    message: message || error?.message || error || "Something went wrong",
    data: null,
    status: statusCode,
  });
};

module.exports = {
  formatResponse,
  sendSuccess,
  sendError,
};
