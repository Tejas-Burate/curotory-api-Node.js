import express from "express";
import {
  getUserDetails,
  getTeachersList,
  getAllTeacherByLanguageId,
  getAllUserByLanguageId,
} from "../controllers/user";

const router = express.Router();

router.get("/getUserDetails/:id", getUserDetails);
router.get("/getTeachersList", getTeachersList);
router.get("/getAllTeacherByLanguageId/:id", getAllTeacherByLanguageId);
router.get("/getAllUserByLanguageId/:id", getAllUserByLanguageId);

export default router;
