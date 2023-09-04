"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.upload = exports.getDropdownLanguageList = exports.getAllLanguageList = void 0;
const language_1 = __importDefault(require("../models/language"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/language');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.upload = upload;
const uploadImage = (req, res) => {
    try {
        const files = req.files; // Explicitly type files as an array of Multer files
        console.log('files', files);
        const image = [];
        if (!files || files.length === 0) {
            res.status(400).json({ status: 400, error: '400', message: 'No file uploaded' });
        }
        else {
            files.forEach((file) => {
                const imageUrl = `${req.protocol}://${req.get('host')}/images/language/${file.filename}`;
                console.log('imageUrl', imageUrl);
                image.push(imageUrl);
            });
            res.status(200).json({ status: 200, error: 'success', message: 'imageUrl created', image });
        }
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
};
exports.uploadImage = uploadImage;
const getAllLanguageList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languageData = yield language_1.default.findAll();
        if (languageData.length === 0) {
            res.status(404).json({ status: 404, error: "404", message: "User Data Not Found" });
        }
        const languageList = [];
        languageData.forEach((language) => {
            languageList.push({
                languageId: language.languageId,
                languageName: language.languageName,
                languageObj: JSON.parse(language.languageObj), // Convert string to JSON
                // dateCreated: language.dateCreated,
                // dateModified: language.dateModified
            });
        });
        res.status(200).json(languageList);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllLanguageList = getAllLanguageList;
const getDropdownLanguageList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const language = yield language_1.default.findAll({
            attributes: ['languageId', 'languageName']
        });
        if (language.length === 0) {
            res.status(404).json({ status: 404, error: "404", message: "Roles Data Not Found" });
        }
        res.status(200).json(language);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getDropdownLanguageList = getDropdownLanguageList;
