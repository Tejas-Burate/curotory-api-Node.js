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
exports.editOptionsByQuestionId = exports.getAllQuestionList = void 0;
const question_1 = __importDefault(require("../models/question"));
const getAllQuestionList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield question_1.default.findAll();
        // console.log("questions", questions);
        if (!questions || questions.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Questions Not Found" });
            return;
        }
        const result = questions.map((question) => ({
            qId: question.dataValues.qId,
            languageId: question.dataValues.languageId,
            levelId: question.dataValues.levelId,
            lessonId: question.dataValues.lessonId,
            question: question.dataValues.question,
            solution: question.dataValues.solution,
            optionList: JSON.parse(question.dataValues.optionList),
            difficultyLevel: question.dataValues.difficultyLevel,
            isActive: question.dataValues.isActive,
        }));
        res.status(200).json(result);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllQuestionList = getAllQuestionList;
const editOptionsByQuestionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { questionId, options } = req.body;
        // Add input validation here if needed
        const question = yield question_1.default.findByPk(questionId);
        if (!question) {
            return res.status(404).json({
                status: 404,
                error: "Not Found",
                message: "Question with the given ID was not found",
            });
        }
        const [rowsUpdated] = yield question_1.default.update({ options }, {
            where: { qid: questionId },
        });
        if (rowsUpdated === 0) {
            return res.status(400).json({
                status: 400,
                error: "Bad Request",
                message: "Failed to update question options",
            });
        }
        return res
            .status(200)
            .json({ message: "Question options updated successfully" });
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: 500,
            error: "Internal Server Error",
            message: "An internal server error occurred",
        });
    }
});
exports.editOptionsByQuestionId = editOptionsByQuestionId;
