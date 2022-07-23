import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { handleRes } from "../utils/response";
import { controllerFunction } from "../types";

export const createHash: controllerFunction = (req, res, next) => {
  const text: string = req.body.password;

  if (!text) return next(new Error("Require A String To Hash"));

  let saltLen = Number(process.env.SALT_LENGTH) || 16;
  let salt = randomBytes(saltLen).toString("hex");

  let hash = scryptSync(text, salt, 64, { N: 1024 }).toString("hex");

  handleRes({ data: `${salt}:${hash}`, txt: "Hash Generated" }, res);
};

export const compareHash: controllerFunction = (req, res, next) => {
  const secret: string = req.body.secret;
  const pwd: string = req.body.password;

  if (!pwd) return next(new Error("Required A Password To Compare"));
  if (!secret) return next(new Error("Required A Secret To Compare"));

  let [salt, hash] = secret.split(":");
  let pwdHash = scryptSync(pwd, salt, 64, { N: 1024 });

  let hashBuffer = Buffer.from(hash, "hex");
  let match = timingSafeEqual(hashBuffer, pwdHash);

  handleRes(
    { data: match, txt: `${!match ? "Incorrect" : "Correct"} Hash` },
    res
  );
};
