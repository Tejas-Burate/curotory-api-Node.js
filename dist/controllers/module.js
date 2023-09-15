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
exports.createModule = exports.updateModuleByModuleId = exports.getModuleByModuleId = exports.getModuleByLessonId = exports.getAllModuleList = void 0;
const module_1 = __importDefault(require("../models/module"));
const question_1 = __importDefault(require("../models/question"));
const getAllModuleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modules = yield module_1.default.findAll();
        console.log("modules", modules);
        if (modules.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Modules Not Found" });
            return;
        }
        const result = modules.map((mod) => ({
            moduleId: mod.dataValues.moduleId.toString(),
            languageId: mod.dataValues.languageId.toString(),
            levelId: mod.dataValues.levelId.toString(),
            lessonId: mod.dataValues.lessonId.toString(),
            moduleName: mod.dataValues.moduleName,
            numberOfQuestions: mod.dataValues.numberOfQuestions.toString(),
            difficulty: mod.dataValues.difficulty,
            mode: mod.dataValues.mode,
            questionSet: JSON.parse(mod.dataValues.questionSet),
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
exports.getAllModuleList = getAllModuleList;
const getModuleByLessonId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const modules = yield module_1.default.findAll({
            where: { lessonId: id },
        });
        if (modules.length === 0) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Modules Not Found" });
            return;
        }
        const question = yield question_1.default.findAll({
            where: { lessonId: id },
        });
        if (question.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: "Question for given lesson Id is Not Found",
            });
            return;
        }
        const result = modules.map((mod) => ({
            moduleId: mod.dataValues.moduleId.toString(),
            languageId: mod.dataValues.languageId.toString(),
            levelId: mod.dataValues.levelId.toString(),
            lessonId: mod.dataValues.lessonId.toString(),
            moduleName: mod.dataValues.moduleName,
            numberOfQuestions: mod.dataValues.numberOfQuestions.toString(),
            difficulty: mod.dataValues.difficulty,
            mode: mod.dataValues.mode,
            questionList: question.map((question) => ({
                questionId: question.dataValues.qId.toString(),
                question: question.dataValues.question,
                solution: question.dataValues.solution,
                answer: question.dataValues.answer,
                optionList: JSON.parse(question.dataValues.optionList),
            })),
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
exports.getModuleByLessonId = getModuleByLessonId;
const getModuleByModuleId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const modules = yield module_1.default.findByPk(id);
        console.log(modules);
        // console.log("moduleName", modules.moduless.dataValues.moduleName);
        if (!modules) {
            res
                .status(404)
                .json({ status: 404, error: "404", message: "Module Not Found" });
            return;
        }
        const question = yield question_1.default.findAll({
            where: { lessonId: modules.dataValues.lessonId },
        });
        if (question.length === 0) {
            res.status(404).json({
                status: 404,
                error: "404",
                message: "Question for the given lesson Id is Not Found",
            });
            return;
        }
        const result = {
            moduleId: modules.dataValues.moduleId.toString(),
            languageId: modules.dataValues.languageId.toString(),
            levelId: modules.dataValues.levelId.toString(),
            lessonId: modules.dataValues.lessonId.toString(),
            moduleName: modules.dataValues.moduleName,
            numberOfQuestions: modules.dataValues.numberOfQuestions.toString(),
            difficulty: modules.dataValues.difficulty,
            mode: modules.dataValues.mode,
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
exports.getModuleByModuleId = getModuleByModuleId;
const updateModuleByModuleId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examMode, moduleName, difficultyLevel, numberOfQuestions, lessonId, levelId, languageId, } = req.body;
        let id = req.params.id;
        const updateModule = yield module_1.default.update({
            mode: examMode,
            moduleName: moduleName,
            difficulty: difficultyLevel,
            numberOfQuestions: numberOfQuestions,
            lessonId: lessonId,
            levelId: levelId,
            languageId: languageId,
            dateModified: Date.now(),
        }, {
            where: { moduleId: id },
        });
        if (!updateModule) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: `Faile to update data of module id ${id}`,
            });
            return;
        }
        const module = yield module_1.default.findByPk(id);
        res.status(200).json(module);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.updateModuleByModuleId = updateModuleByModuleId;
const createModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examMode, moduleName, difficultyLevel, numberOfQuestions, lessonId, levelId, languageId, } = req.body;
        const module = yield module_1.default.create({
            mode: examMode,
            moduleName: moduleName,
            difficulty: difficultyLevel,
            numberOfQuestions: numberOfQuestions,
            lessonId: lessonId,
            levelId: levelId,
            languageId: languageId,
            dateCreated: Date.now(),
            dateModified: Date.now(),
        });
        if (!module) {
            res.status(400).json({
                status: 400,
                error: "400",
                message: "Failed to create module",
            });
            return;
        }
        res.status(200).json(module);
    }
    catch (error) {
        console.log("error", error);
        res
            .status(500)
            .json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.createModule = createModule;
