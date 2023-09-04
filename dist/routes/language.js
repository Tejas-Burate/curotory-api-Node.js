"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const langauge_1 = require("../controllers/langauge");
const router = express_1.default.Router();
router.get('/getAllLanguageList', langauge_1.getAllLanguageList);
router.get('/getDropdownLanguageList', langauge_1.getDropdownLanguageList);
router.post('/uploadImage', langauge_1.upload.array('imageFile'), langauge_1.uploadImage);
exports.default = router;
