import express from "express";
import { compareHash, createHash } from "../controllers/hash.controller";

const router = express.Router();

router.post("/", createHash);

router.post("/compare", compareHash);

export const hashRoute = router;
