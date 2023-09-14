import express from "express";
import {
    getAllPlanList,
    getPlansByLanguageId
} from "../controllers/plan";

const router = express.Router();

router.get("/getAllPlanList",getAllPlanList);
router.post("/getPlansByLanguageId",getPlansByLanguageId);

export default router;