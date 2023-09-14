import express from "express";
import {emailLogin} from "../controllers/login";

const router = express.Router();

router.post("/emailLogin",emailLogin);

export default router;