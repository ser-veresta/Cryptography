import {
  createCipheriv,
  createDecipheriv,
  generateKeyPair,
  publicEncrypt,
} from "crypto";
import { promisify } from "node:util";
import { controllerFunction } from "../types";
import { handleRes } from "../utils/response";

const asyncGenKeyPair = promisify(generateKeyPair);

export const symEncrypt: controllerFunction = (req, res, next) => {
  const msg: string = req.body.message;
  const secret: string = req.body.secret;

  if (!msg) return next(new Error("Required Message To Encrypt"));

  const key = Buffer.from(secret || process.env.SECRET_KEY || "secret");
  const iv = Buffer.from(process.env.IV || "00d573a2607f1171aad2de7036faa215");

  const cipher = createCipheriv("aes256", key, iv);

  const encryptMsg = cipher.update(msg, "utf8", "hex") + cipher.final("hex");

  handleRes({ data: encryptMsg, txt: "Message Encrypted !!" }, res);
};

export const symDecrypt: controllerFunction = (req, res, next) => {
  const msg: string = req.body.encrypted_message;
  const secret: string = req.body.secret;

  if (!msg) return next(new Error("Required Encrypted Message To Decrypt"));

  const key = Buffer.from(secret || process.env.SECRET_KEY || "secret");
  const iv = Buffer.from(process.env.IV || "00d573a2607f1171aad2de7036faa215");

  const decipher = createDecipheriv("aes256", key, iv);

  const decryptMsg =
    decipher.update(msg, "hex", "utf8") + decipher.final("utf8");

  handleRes({ data: decryptMsg, txt: "Message Decrypted !!" }, res);
};

export const genKeyPair: controllerFunction = async (req, res) => {
  const secret: string = req.body.secret;

  const keyPair = await asyncGenKeyPair("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: secret,
    },
  });

  handleRes({ data: keyPair, txt: "Key Pair Generated !!" }, res);
};

export const pubEncrypt: controllerFunction = (req, res, next) => {
  const msg = req.body.message;
  const pubKey = req.body.publicKey;

  if (!msg) return next(new Error("Required Message to Encrypt"));

  if (!pubKey) return next(new Error("Required Public Key to Encrypt"));

  const encryptedMsg = publicEncrypt(pubKey, Buffer.from(msg)).toString("hex");

  handleRes({ data: encryptedMsg, txt: "Data Encrypted" }, res);
};

export const pubDecrypt: controllerFunction = (req, res, next) => {
  const encMsg = req.body.encryptedMessage;
  const privateKey = req.body.privateKey;

  if (!encMsg) return next(new Error("Required Encrypted Message to Decrypt"));

  if (!privateKey) return next(new Error("Required Private Key to Decrypt"));

  const msg = publicEncrypt(privateKey, Buffer.from(encMsg, "hex")).toString(
    "hex"
  );

  handleRes({ data: msg, txt: "Data Decrypted !!" }, res);
};
