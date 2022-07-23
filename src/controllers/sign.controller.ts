import { promisify } from "node:util";
import { handleRes } from "../utils/response";
import { controllerFunction } from "../types";
import { createSign, createVerify, generateKeyPair } from "node:crypto";

const asyncGenKeyPair = promisify(generateKeyPair);

export const signMsg: controllerFunction = (req, res, next) => {
  const msg = req.body.message;
  const privateKey = req.body.privateKey;

  if (!msg) return next(new Error("Required Message to Sign"));

  if (!privateKey) return next(new Error("Required Private Key to Sign"));

  const signer = createSign("rsa-sha256");

  signer.update(msg);

  const signedMsg = signer.sign(privateKey, "hex");

  handleRes({ data: signedMsg, txt: "Message Signed !!" }, res);
};

export const verifySignature: controllerFunction = (req, res, next) => {
  const msg = req.body.message;
  const pubKey = req.body.publicKey;
  const signedMsg = req.body.signedMessage;

  if (!msg) return next(new Error("Required Message to Verify"));

  if (!pubKey) return next(new Error("Required Public Key to Verify"));

  if (!signedMsg) return next(new Error("Required Signed Message to Verify"));

  const verifier = createVerify("rsa-sha256");

  verifier.update(msg);

  const isVerified = verifier.verify(pubKey, signedMsg, "hex");

  handleRes({ data: isVerified, txt: "Message Verified" }, res);
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
