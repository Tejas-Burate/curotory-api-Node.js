import express from "express";
import { getAllJitsiMeeting } from "../controllers/meeting";

const router = express.Router();

router.get("/getAllJitsiMeeting", getAllJitsiMeeting);

export default router;
