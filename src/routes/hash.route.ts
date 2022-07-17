import express from "express";
import { compareHash, createHash } from "../controllers/hash.controller";

const router = express.Router();

router.post("/", createHash);

router.post("/compare", compareHash);

router.get("/info", (_, res) => res.send("Hash"));

export const hashRoute = router;
