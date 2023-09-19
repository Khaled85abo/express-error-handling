import { NextFunction, Request, Response } from "express";
import { ERRORS } from "../constants/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: "Invalid JSON" });
  }
  switch (err.message) {
    case ERRORS.invalid_cridentials:
      res.status(403);
      break;
    case ERRORS.unauthorized:
      res.status(401);
      break;
    case ERRORS.forbidden:
      res.status(403);
      break;
    case ERRORS.expired_token:
      res.status(401);
      break;
    case ERRORS.bad_request:
      res.status(400);
      break;
    case ERRORS.not_found:
      res.status(404);
      break;
    default:
      res
        .status(500)
        .json({ error: "Something went wrong, please contact your admin" });
  }
  res.json({ error: err.message });
  next(err);
};
