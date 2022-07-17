import { createHmac, timingSafeEqual } from "crypto";
import { NextFunction, Request, Response } from "express";
import { handleRes } from "src/utils/response";

export const createHmacHash = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let text: string = req.body.text;

  if (!text) return next(new Error("Required Text To Hash"));

  let data = { text };

  let key = process.env.SECRET_KEY || "super-secret-key";
  let hmac = createHmac("sha256", key)
    .update(JSON.stringify(data))
    .digest("hex");

  handleRes({ data: hmac, txt: "hmac Hash Generated !!" }, res);
};

export const compareHmacHash = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let hmacText: string = req.body.hmac;
  let text: string = req.body.text;

  if (!text) return next(new Error("Required A Text To Compare"));
  if (!hmacText) return next(new Error("Required A Hmac To Compare"));

  let data = { text };

  let key = process.env.SECRET_KEY || "super-secret-key";
  let hmac = createHmac("sha256", key).update(JSON.stringify(data)).digest();

  let hmacTextBuffer = Buffer.from(hmacText, "hex");

  let match = timingSafeEqual(hmac, hmacTextBuffer);

  handleRes(
    { data: match, txt: `${!match ? "Incorrect" : "Correct"} Text` },
    res
  );
};
