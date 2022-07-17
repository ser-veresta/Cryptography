import { ResponseType as Response } from "src/types";
import { Response as res } from "express";

export const handleRes = (obj: Response, res: res) => {
  res.status(obj.code || 200).json(obj);
};
