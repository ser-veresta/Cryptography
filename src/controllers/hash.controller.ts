import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "node:util";
import { handleRes } from "../utils/response";
import { controllerFunction } from "../types";

const asyncScrypt = promisify(scrypt);

export const createHash: controllerFunction = async (req, res, next) => {
  const text: string = req.body.password;

  if (!text) return next(new Error("Require A String To Hash"));

  let saltLen = Number(process.env.SALT_LENGTH) || 16;
  let salt = randomBytes(saltLen).toString("hex");

  let hash = await asyncScrypt(text, salt, 64);

  if (!Buffer.isBuffer(hash)) return next(new Error("Internal Error"));

  hash = hash.toString("hex");

  handleRes({ data: `${salt}:${hash}`, txt: "Hash Generated" }, res);
};

export const compareHash: controllerFunction = async (req, res, next) => {
  const secret: string = req.body.secret;
  const pwd: string = req.body.password;

  if (!pwd) return next(new Error("Required A Password To Compare"));
  if (!secret) return next(new Error("Required A Secret To Compare"));

  let [salt, hash] = secret.split(":");
  let pwdHash = await asyncScrypt(pwd, salt, 64);

  if (!Buffer.isBuffer(pwdHash)) return next(new Error("Internal Error"));

  let hashBuffer = Buffer.from(hash, "hex");
  let match = timingSafeEqual(hashBuffer, pwdHash);

  handleRes(
    { data: match, txt: `${!match ? "Incorrect" : "Correct"} Hash` },
    res
  );
};
