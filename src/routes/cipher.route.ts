import express from "express";
import {
  genKeyPair,
  pubDecrypt,
  pubEncrypt,
  symDecrypt,
  symEncrypt,
} from "../controllers/cipher.controller";

const router = express.Router();

/**
 * @Route /cipher/symEnc
 * @Method POST
 * @param String message
 * @param String secret
 * @return {} Encrypted Message
 */
router.post("/symEnc", symEncrypt);

/**
 * @Route /cipher/symDec
 * @Method POST
 * @param String encryptedMessage
 * @param String secret
 * @return {} Decrypted Message
 */
router.post("/symDec", symDecrypt);

/**
 * @Route /cipher/keyPair
 * @Method POST
 * @param String secret (Optional)
 * @return {} PublicKey,PrivateKey
 */
router.post("/keyPair", genKeyPair);

/**
 * @Route /cipher/keyEncrypt
 * @Method POST
 * @param String message
 * @param String publicKey
 * @return {} Encrypted Message
 */
router.post("/KeyEncrypt", pubEncrypt);

/**
 * @Route /cipher/keyDecrypt
 * @Method POST
 * @param String message
 * @param String privateKey
 * @return {} Decrypted Message
 */
router.post("/keyDecrypt", pubDecrypt);

/**
 * @Route /cipher/info
 * @Method GET
 * @return String
 */
router.get("/info", (_, res) => res.send("Cipher"));

export const cipherRoute = router;
