import express from "express";
import {
     getUserDetails,
    getTeachersList 
} from "../controllers/user";

const router = express.Router();

router.get("/getUserDetails/:id",getUserDetails);
router.get("/getTeachersList",getTeachersList);

export default router