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
exports.updateTestByTestId = exports.getTestListByLanguageId = exports.createTest = exports.getTestByTestId = exports.getTestList = void 0;
const test_1 = __importDefault(require("../models/test"));
const question_1 = __importDefault(require("../models/question"));
const getTestList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield test_1.default.findAll();
        if (test.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Tests Not Found" });
        }
        const result = test.map((test) => ({
            testId: test.testId.toString(),
            languageId: test.languageId.toString(),
            levelId: test.levelId.toString(),
            lessonId: JSON.parse(test.lesson),
            testImage: test.testImage,
            testName: test.testName,
            rightAns: test.rightAns.toString(),
            wrongAns: test.wrongAns.toString(),
            numberOfQuestions: test.totalQues.toString(),
            questionList: JSON.parse(test.questions),
            examTimeInMinutes: test.time.toString(),
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
exports.getTestList = getTestList;
const getTestByTestId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const test = yield test_1.default.findByPk(id);
        if (!test) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Test Not Found" });
            return;
        }
        const question = yield question_1.default.findAll({
            where: { levelId: test.dataValues.levelId },
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
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getTestByTestId = getTestByTestId;
const createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { languageId, levelId, lesson, testName, numberOfQuestions, examTimeInMinutes, testImage, } = req.body;
        const test = yield test_1.default.create({
            languageId: languageId,
            levelId: levelId,
            lesson: JSON.parse(lesson),
            testName: testName,
            totalQues: numberOfQuestions,
            time: examTimeInMinutes,
            testImage: testImage,
        });
        if (!test) {
            res
                .status(400)
                .json({ status: 400, error: "400", message: "Failed to create test" });
            return;
        }
        res.status(201).json(test);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.createTest = createTest;
const getTestListByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const tests = yield test_1.default.findAll({
            where: { languageId: id },
        });
        // Check if no tests were found
        if (tests.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Test of Language Id ${id} is Not Found`,
            });
            return;
        }
        // Process each test individually and collect the results in an array
        const results = yield Promise.all(tests.map((test) => __awaiter(void 0, void 0, void 0, function* () {
            const questions = yield question_1.default.findAll({
                where: { levelId: test.dataValues.levelId },
            });
            return {
                testId: test.dataValues.testId.toString(),
                languageId: test.dataValues.languageId.toString(),
                levelId: test.dataValues.levelId.toString(),
                lessonId: JSON.parse(test.dataValues.lesson),
                testName: test.dataValues.testName,
                numberOfQuestions: test.dataValues.totalQues.toString(),
                examTimeInMinutes: test.dataValues.time.toString(),
                questionList: questions.map((q) => ({
                    questionId: q.dataValues.qId.toString(),
                    question: q.dataValues.question,
                    solution: q.dataValues.solution,
                    answer: q.dataValues.answer,
                    optionList: JSON.parse(q.dataValues.optionList),
                })),
            };
        })));
        // Send the results as JSON response
        res.status(200).json(results);
    }
    catch (error) {
        console.error("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getTestListByLanguageId = getTestListByLanguageId;
const updateTestByTestId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { languageId, levelId, lesson, testName, numberOfQuestions, examTimeInMinutes, testImage, } = req.body;
        const id = req.params.id;
        const test = yield test_1.default.findByPk(id);
        if (!test) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: `Test of Test Id ${id} is not found`,
            });
            return;
        }
        const updateTest = yield test_1.default.update({
            languageId: languageId,
            levelId: levelId,
            lesson: lesson,
            testName: testName,
            totalQues: numberOfQuestions,
            time: examTimeInMinutes,
            testImage: testImage,
            dateModified: Date.now(),
        }, {
            where: { testId: test.dataValues.testId },
        });
        if (!updateTest) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: `Failed to update test of id ${id}`,
            });
            return;
        }
        const testData = yield test_1.default.findByPk(id);
        if (testData) {
            const result = {
                testId: testData.dataValues.testId.toString(),
                languageId: testData.dataValues.languageId.toString(),
                levelId: testData.dataValues.levelId.toString(),
                lessonId: JSON.parse(testData.dataValues.lesson),
                testImage: testData.dataValues.testImage,
                testName: testData.dataValues.testName,
                rightAns: testData.dataValues.rightAns.toString(),
                wrongAns: testData.dataValues.wrongAns.toString(),
                numberOfQuestions: testData.dataValues.totalQues.toString(),
                questionList: JSON.parse(testData.dataValues.questions),
                examTimeInMinutes: testData.dataValues.time.toString(),
            };
            res.status(200).json(result);
        }
    }
    catch (error) {
        console.error("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.updateTestByTestId = updateTestByTestId;
