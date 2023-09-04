import express from "express";
import {
     getUserDetails,
    getTeachersList,
    getAllTeacherByLanguageId 
} from "../controllers/user";

const router = express.Router();

router.get("/getUserDetails/:id",getUserDetails);
router.get("/getTeachersList",getTeachersList);
router.get("/getAllTeacherByLanguageId/:id",getAllTeacherByLanguageId);

export default router;