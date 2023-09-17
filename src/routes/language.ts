import express from "express";
import {
  getAllLanguageList,
  getDropdownLanguageList,
  upload,
  uploadImage,
  createLanguage,
  getDataTableForLanguageList,
} from "../controllers/langauge";

const router = express.Router();

router.get("/getAllLanguageList", getAllLanguageList);
router.get("/getDropdownLanguageList", getDropdownLanguageList);
router.post("/uploadImage", upload.array("imageFile"), uploadImage);
router.post("/createLanguage", createLanguage);
router.post("/getDataTableForLanguageList", getDataTableForLanguageList);

export default router;
