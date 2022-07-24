import express from "express";
import { compareHash, createHash } from "../controllers/hash.controller";

const router = express.Router();

/**
 * @Route /hash
 * @Method POST
 * @param String password
 * @return {} Hash Password
 */
router.post("/", createHash);

/**
 * @Route /hash/compare
 * @Method POST
 * @param String password
 * @param String secret (Hash Password)
 * @return {} Boolean
 */
router.post("/compare", compareHash);

/**
 * @Route /hash/info
 * @Method GET
 * @return String
 */
router.get("/info", (_, res) => res.send("Hash"));

export const hashRoute = router;
