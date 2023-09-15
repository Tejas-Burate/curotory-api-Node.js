"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vedio_1 = require("../controllers/vedio");
const router = express_1.default.Router();
router.get("/getAllVideoList", vedio_1.getAllVideoList);
router.get("/getVideoListByLevelId/:id", vedio_1.getVideoListByLevelId);
router.post("/createVideo", vedio_1.createVideo);
router.put("/updateVideoByVideoId/:id", vedio_1.updateVideoByVideoId);
exports.default = router;
