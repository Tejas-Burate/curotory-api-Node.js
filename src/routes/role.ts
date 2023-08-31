import express from "express";
import { getDropdownRoleList } from "../controllers/role";
// import { default } from '../controllers/role';


const router=express.Router();

router.get('/getDropdownRoleList',getDropdownRoleList);

export default router;