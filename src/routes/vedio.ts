import express from "express";
import {
    getAllVideoList,
    getVideoListByLevelId,
    createVideo,
    updateVideoByVideoId
} from "../controllers/vedio";

const router = express.Router();

router.get("/getAllVideoList",getAllVideoList);
router.get("/getVideoListByLevelId/:id",getVideoListByLevelId);
router.post("/createVideo",createVideo);
router.put("/updateVideoByVideoId/:id",updateVideoByVideoId);

export default router;