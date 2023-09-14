import express from "express";
import {
  getTestList,
  getTestByTestId,
  createTest,
  getTestListByLanguageId,
  updateTestByTestId,
} from "../controllers/test";

const router = express.Router();

router.get("/getTestList", getTestList);
router.get("/getTestByTestId/:id", getTestByTestId);
router.get("/getTestListByLanguageId/:id", getTestListByLanguageId);
router.post("/createTest", createTest);
router.put("/updateTestByTestId/:id", updateTestByTestId);

export default router;
