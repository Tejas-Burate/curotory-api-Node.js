import express from "express";
import {
    createLevel, 
    getLevelsByLevelId,
    getAllLevelsByLanguageId,
    updateLevelByLevelId
} from "../controllers/level";

const router = express.Router();

router.post("/createLevel",createLevel);
router.get("/getLevelsByLevelId/:id",getLevelsByLevelId);
router.get("/getAllLevelsByLanguageId/:id",getAllLevelsByLanguageId);
router.put("/updateLevelByLevelId/:id",updateLevelByLevelId);


export default router