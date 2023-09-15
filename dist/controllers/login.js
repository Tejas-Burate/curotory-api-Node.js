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
exports.emailLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const language_1 = __importDefault(require("../models/language"));
const emailLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield user_1.default.findOne({
            where: {
                email: body.email,
                password: body.password,
                deviceRegistrationToken: body.deviceRegistrationToken
            }
        });
        console.log("User = ", user);
        if (!user) {
            res.status(404).json({ status: 404, error: "404", message: "Invalid email and password" });
            return;
        }
        const language = yield language_1.default.findOne({
            where: { languageId: user.dataValues.languageId }
        });
        if (!language) {
            res.status(404).json({ status: 404, error: "404", message: "Language Id of Given User is not found" });
            return;
        }
        const id = process.env.JWT_TOKEN_SECRET;
        console.log('id', id);
        const accessToken = jsonwebtoken_1.default.sign({
            email: user.dataValues.email
        }, "12345", 
        // process.env.JWT_TOKEN_SECRET as Secret,
        { expiresIn: "20m" });
        console.log("accessToken", accessToken);
        const result = {
            userId: user.dataValues.userId,
            email: user.dataValues.email,
            role: user.dataValues.roleId,
            fullName: user.dataValues.fullName,
            mobile: user.dataValues.mobile,
            language: {
                languageId: language.dataValues.languageId,
                languageName: language.dataValues.languageName,
                languageObj: JSON.parse(language.dataValues.languageObj),
            },
            dateOfBirth: user.dataValues.dateOfBirth,
            profileImage: user.dataValues.profileImage,
            token: null,
            userType: null
        };
        res.status(200).json(result);
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.emailLogin = emailLogin;
