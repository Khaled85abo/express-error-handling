import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
  errorCode: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.errorCode = errorCode;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

class InvalidCredentials extends CustomError {
  constructor() {
    super(`Invalid credentials`, 403);
  }
}
class Unauthorized extends CustomError {
  constructor() {
    super(`Unauthorized`, 401);
  }
}
class Forbidden extends CustomError {
  constructor() {
    super(`Forbidden`, 403);
  }
}

class TokenExpired extends CustomError {
  constructor() {
    super(`Token expired, please log in again`, 401);
  }
}

class MissingHeader extends CustomError {
  constructor() {
    super(`Content-Type header is missing`, 400);
  }
}

class InvalidFile extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class FileExists extends CustomError {
  constructor(fileName) {
    super(
      `${fileName} already exists. Please change the name and upload again`,
      500
    );
  }
}

class UserNotFound extends CustomError {
  constructor(id) {
    super(`User with id ${id} not found`, 404);
  }
}

class WrongRole extends CustomError {
  constructor(id, role) {
    super(`User with id ${id} is not ${role}`, 400);
  }
}

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof CustomError) {
    console.log("Error is an instance of custom error class");
    res.status(error.errorCode).json({ error: error.message });
  } else if (error instanceof SyntaxError) {
    res.status(400).json({ error: "Invalid JSON" });
  } else {
    console.error(error);
    res.status(500).json({
      error: "Something went wrong, please contact your system admin",
    });
  }
}

export default {
  errorHandler,
  CustomError,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
  Forbidden,
  MissingHeader,
  UserNotFound,
  InvalidFile,
  FileExists,
  WrongRole,
};
