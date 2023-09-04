import express from "express";
import {
    getAllLanguageList,
    getDropdownLanguageList,
    upload,
    uploadImage,
    createLanguage
} from "../controllers/langauge";

const router = express.Router();

router.get('/getAllLanguageList',getAllLanguageList);
router.get('/getDropdownLanguageList',getDropdownLanguageList);
router.post('/uploadImage',upload.array('imageFile'),uploadImage);
router.post('/createLanguage',createLanguage);


export default router;