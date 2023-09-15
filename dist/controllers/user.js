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
exports.getAllUserByLanguageId = exports.getAllTeacherByLanguageId = exports.getTeachersList = exports.getUserDetails = void 0;
const user_1 = __importDefault(require("../models/user"));
const db_1 = __importDefault(require("../config/db"));
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userData = yield user_1.default.findAll({
            where: {
                userId: id,
            },
        });
        if (userData.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "User Data Not Found" });
        }
        else {
            res.status(200).json(userData);
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getUserDetails = getUserDetails;
const getTeachersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = "SELECT user.fullName, teacherdetails.* FROM `user` INNER JOIN `teacherdetails` ON user.userId = teacherdetails.userId";
        const [result] = yield db_1.default.query(query); // Destructure the result array directly
        if (result.length === 0) {
            return res
                .status(404)
                .json({ status: 404, error: "404", message: "User Data Not Found" });
        }
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getTeachersList = getTeachersList;
const getAllTeacherByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const query = "SELECT user.fullName,user.profileImage, teacherdetails.* FROM `user` INNER JOIN `teacherdetails` ON user.userId = teacherdetails.userId AND user.languageId = :id";
        const [result] = yield db_1.default.query(query, { replacements: { id } });
        if (!result || result.length === 0) {
            return res
                .status(404)
                .json({ status: 404, error: "404", message: "User Data Not Found" });
        }
        const data1 = [];
        // Push each teacher's fullName into the data1 array
        result.forEach((row) => {
            data1.push({
                teacherName: row.fullName,
                teacherId: row.userId,
                profileImage: row.profileImage,
                // teacherDatailId : row.teacherDetailId,
                proficiency: row.proficiency,
                trainedAt: row.trainedAt,
                certification: row.certification,
                experience: row.experience,
            });
        });
        res.status(200).json(data1);
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllTeacherByLanguageId = getAllTeacherByLanguageId;
const getAllUserByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.findAll({
            where: {
                roleId: 0,
                languageId: id,
            },
        });
        if (user.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Users of Language Id ${id} is not found`,
            });
            return;
        }
        const result = user.map((user) => ({
            userId: user.dataValues.userId.toString(),
            fullName: user.dataValues.fullName,
        }));
        res.status(200).json(result);
    }
    catch (error) {
        console.error("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllUserByLanguageId = getAllUserByLanguageId;
