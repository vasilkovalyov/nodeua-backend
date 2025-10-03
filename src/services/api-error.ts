import status from "../utils/status";

class ApiError extends Error {
  status: number;
  errors: string[];
  message: string;

  constructor(status: number, message: string, errors: string[]) {
    super();
    this.status = status;
    this.errors = errors;
    this.message = message;
  }

  static UnauthorizedError(message: string, errors = []) {
    return new ApiError(status.UNAUTHORIZED, message, errors);
  }

  static ForbiddenError(message: string, errors = []) {
    return new ApiError(status.FORBIDDEN, message, errors);
  }

  static BadRequestError(message: string, errors = []) {
    return new ApiError(status.BAD_REQUEST, message, errors);
  }
}

export default ApiError;
