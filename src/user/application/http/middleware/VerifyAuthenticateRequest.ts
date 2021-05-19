import { NextFunction, Request, RequestHandler, Response } from 'express';

const verify: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  console.log('todo :: verify request');
  return next();
};

export default verify;
