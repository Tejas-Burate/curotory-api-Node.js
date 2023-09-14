import express from "express";
import {
  getAllModuleList,
  getModuleByLessonId,
  getModuleByModuleId,
  updateModuleByModuleId,
  createModule,
} from "../controllers/module";

const router = express.Router();

router.get("/getAllModuleList", getAllModuleList);
router.get("/getModuleByLessonId/:id", getModuleByLessonId);
router.get("/getModuleByModuleId/:id", getModuleByModuleId);
router.put("/updateModuleByModuleId/:id", updateModuleByModuleId);
router.post("/createModule", createModule);

export default router;
