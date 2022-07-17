import { NextFunction, Request, Response } from "express";

export interface ResponseType {
  code?: number;
  data?: any;
  txt?: string;
}

export type controllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
