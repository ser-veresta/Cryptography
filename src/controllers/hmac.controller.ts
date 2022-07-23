import { createHmac, timingSafeEqual } from "crypto";
import { controllerFunction } from "../types";
import { handleRes } from "../utils/response";

export const createHmacHash: controllerFunction = (req, res, next) => {
  let text: string = req.body.text;

  if (!text) return next(new Error("Required Text To Hash"));

  let data = { text };

  let key = process.env.SECRET_KEY || "super-secret-key";
  let hmac = createHmac("sha256", key)
    .update(JSON.stringify(data))
    .digest("hex");

  handleRes({ data: hmac, txt: "hmac Hash Generated !!" }, res);
};

export const compareHmacHash: controllerFunction = (req, res, next) => {
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
