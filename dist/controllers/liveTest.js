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
exports.getLiveTestByTestId = void 0;
const liveTest_1 = __importDefault(require("../models/liveTest"));
const question_1 = __importDefault(require("../models/question"));
const getLiveTestByTestId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const test = yield liveTest_1.default.findByPk(id);
        if (!test) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Live Test of Id ${id} is not found`,
            });
            return;
        }
        const question = yield question_1.default.findAll({
            where: { qId: JSON.parse(test.dataValues.questions) },
        });
        const result = {
            testId: test.dataValues.testId.toString(),
            languageId: test.dataValues.languageId.toString(),
            levelId: test.dataValues.levelId.toString(),
            lessonId: JSON.parse(test.dataValues.lesson),
            testName: test.dataValues.testName,
            numberOfQuestions: test.dataValues.totalQues.toString(),
            examTimeInMinutes: test.dataValues.time.toString(),
            questionList: question.map((q) => ({
                questionId: q.dataValues.qId.toString(),
                question: q.dataValues.question,
                solution: q.dataValues.solution,
                answer: q.dataValues.answer,
                optionList: JSON.parse(q.dataValues.optionList),
            })),
        };
        res.status(200).json(result);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", messagr: "Internal Server Error" });
    }
});
exports.getLiveTestByTestId = getLiveTestByTestId;
