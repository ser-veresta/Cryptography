import express from "express";
import {
  compareHmacHash,
  createHmacHash,
} from "../controllers/hmac.controller";

const router = express.Router();

/**
 * @Route /hmac
 * @Method POST
 * @param String text
 * @return {} Hashed Text
 */
router.post("/", createHmacHash);

/**
 * @Route /hmac/compare
 * @Method POST
 * @param String hmac (Hashed Text)
 * @param String text
 * @return {} Boolean
 */
router.post("/compare", compareHmacHash);

/**
 * @Route /hmac/info
 * @Method GET
 * @return String
 */
router.get("/info", (_, res) => res.send("HMAC"));

export const hmacRoute = router;
