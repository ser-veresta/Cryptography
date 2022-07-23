import express from "express";
import {
  genKeyPair,
  signMsg,
  verifySignature,
} from "../controllers/sign.controller";

const router = express.Router();

router.post("/sign", signMsg);

router.post("/verify", verifySignature);

router.post("/keyPair", genKeyPair);

router.get("/info", (_, res) => res.send("Sign"));

export const SignRoute = router;
