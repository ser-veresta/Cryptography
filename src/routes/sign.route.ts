import express from "express";
import {
  genKeyPair,
  signMsg,
  verifySignature,
} from "../controllers/sign.controller";

const router = express.Router();

/**
 * @Route /sign
 * @Method POST
 * @param String message
 * @param String privateKey
 * @return {} Signed Message
 */
router.post("/", signMsg);

/**
 * @Route /sign/verify
 * @Method POST
 * @param String message
 * @param String publicKey
 * @param String signedMessage
 * @return {} Boolean
 */
router.post("/verify", verifySignature);

/**
 * @Route /sign/keyPair
 * @Method POST
 * @param String secret (Optional)
 * @return {} publickKey,privateKey
 */
router.post("/keyPair", genKeyPair);

/**
 * @Route /sign/info
 * @Method GET
 * @return String
 */
router.get("/info", (_, res) => res.send("Sign"));

export const SignRoute = router;
