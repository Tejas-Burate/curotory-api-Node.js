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
exports.updateLevelByLevelId = exports.getAllLevelsByLanguageId = exports.getLevelsByLevelId = exports.createLevel = void 0;
const level_1 = __importDefault(require("../models/level"));
const createLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levelData = req.body;
        const level = yield level_1.default.build({
            languageId: levelData.languageId,
            levelName: levelData.levelName,
            dateCreated: Date.now(),
            dateModified: Date.now()
        });
        if (!level) {
            res.status(400).json({ status: 400, error: "400", message: "Unable to create new level.." });
            return;
        }
        yield level.save();
        res.status(201).json(level);
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation error
            const validationErrors = error.errors.map((err) => ({
                field: err.path,
                message: err.message,
            }));
            res.status(400).json({
                status: 400,
                error: 'Bad Request',
                message: 'Validation error',
                validationErrors,
            });
        }
        else {
            console.error(error);
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error',
                message: 'An error occurred while saving the level.',
            });
        }
    }
});
exports.createLevel = createLevel;
const getLevelsByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.userId;
        console.log('id', id);
        const level = yield level_1.default.findAll({
            where: { languageId: id },
        });
        if (!level) {
            res.status(400).json({ status: 400, error: 400, message: "Level of given id is not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getLevelsByLevelId = getLevelsByLevelId;
const getAllLevelsByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const level = yield level_1.default.findAll({
            attributes: ["levelId", "languageId"],
            where: {
                languageId: id
            },
        });
        if (!id) {
            res.status(400).json({ status: 404, error: "404", message: "Level of given id is not found" });
            return;
        }
        res.status(200).json(level);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllLevelsByLanguageId = getAllLevelsByLanguageId;
const updateLevelByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const validateLevelId = yield level_1.default.findAll({
            where: { levelId: id },
        });
        if (validateLevelId.length === 0) {
            res.status(404).json({ status: 400, erorr: "400", message: "level Id not found" });
            return;
        }
        const level = yield level_1.default.update(req.body, {
            where: { levelId: id },
            returning: true,
        });
        if (!level) {
            res.status(400).json({ status: 400, error: 400, message: `Unable to update category of id ${id}` });
            return;
        }
        console.log(level);
        res.status(200).json(yield level_1.default.findAll({ where: { levelId: id } }));
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation error
            const validationErrors = error.errors.map((err) => ({
                field: err.path,
                message: err.message,
            }));
            res.status(400).json({
                status: 400,
                error: 'Bad Request',
                message: 'Validation error',
                validationErrors,
            });
        }
        else {
            console.error(error);
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error',
                message: 'An error occurred while saving the level.',
            });
        }
    }
});
exports.updateLevelByLevelId = updateLevelByLevelId;
