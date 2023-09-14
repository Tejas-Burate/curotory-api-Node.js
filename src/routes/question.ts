import express from "express";
import {
  getAllQuestionList,
  editOptionsByQuestionId,
} from "../controllers/question";

const router = express.Router();

router.get("/getAllQuestionList", getAllQuestionList);
router.post("/editOptionsByQuestionId", editOptionsByQuestionId);

export default router;
