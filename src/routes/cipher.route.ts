import express from "express";
import {
  genKeyPair,
  pubDecrypt,
  pubEncrypt,
  symDecrypt,
  symEncrypt,
} from "../controllers/cipher.controller";

const router = express.Router();

router.post("/symEnc", symEncrypt);

router.post("/symDec", symDecrypt);

router.post("/keyPair", genKeyPair);

router.post("/KeyEncrypt", pubEncrypt);

router.post("/keyDecrypt", pubDecrypt);

router.get("/info", (_, res) => res.send("Cipher"));

export const cipherRoute = router;
