import express from "express";
import {
  compareHmacHash,
  createHmacHash,
} from "src/controllers/hmac.controller";

const router = express.Router();

router.post("/", createHmacHash);

router.post("/compare", compareHmacHash);

router.get("/info", (_, res) => res.send("HMAC"));

export const hmacRoute = router;
