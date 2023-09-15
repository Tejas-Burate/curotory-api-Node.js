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
exports.updateVideoByVideoId = exports.createVideo = exports.getVideoListByLevelId = exports.getAllVideoList = void 0;
const vedio_1 = __importDefault(require("../models/vedio"));
const getAllVideoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield vedio_1.default.findAll();
        if (video.length === 0) {
            res.status(404).json({ status: 404, error: "404", message: "Video are not found" });
            return;
        }
        res.status(200).json(video);
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getAllVideoList = getAllVideoList;
const getVideoListByLevelId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const video = yield vedio_1.default.findAll({
            where: {
                levelId: id
            }
        });
        if (video.length === 0) {
            res.status(404).json({ status: 404, error: "404", message: `Videos of level Id ${id} are not found` });
            return;
        }
        res.status(200).json(video);
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.getVideoListByLevelId = getVideoListByLevelId;
const createVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { languageId, levelId, lessonId, videoName, videoThumbnail, videoFileName } = req.body;
        const video = yield vedio_1.default.create({
            languageId: languageId,
            levelId: levelId,
            lessonId: lessonId,
            videoName: videoName,
            videoThumbnail: videoThumbnail,
            videoFileName: videoFileName,
            dateCreated: Date.now(),
            dateModified: Date.now()
        });
        if (!video) {
            res.status(400).json({ status: 400, error: "400", message: "Failed to create a video" });
            return;
        }
        res.status(201).json({ message: "Video created successfully", video });
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.createVideo = createVideo;
const updateVideoByVideoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vd = req.body;
        const videoId = req.params.id;
        const video = yield vedio_1.default.update({ vd, dateModified: Date.now() }, {
            where: { videoId: videoId },
            returning: true,
        });
        if (!video) {
            res.status(400).json({ status: 400, error: "400", message: `Failed to update a video Id ${videoId}` });
            return;
        }
        const videoDetails = yield vedio_1.default.findByPk(videoId);
        res.status(200).json({ message: "Vedio updated successfully", videoDetails });
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
});
exports.updateVideoByVideoId = updateVideoByVideoId;
