import Video from '../models/vedio';
import { Request,Response } from 'express';


const getAllVideoList = async(req:Request,res:Response) =>{
    try {
        const video = await Video.findAll();

        if(video.length === 0){
            res.status(404).json({status:404,error:"404",message:"Video are not found"});
            return;
        }

        res.status(200).json(video);
    } catch (error) {
        console.log('error', error);
        res.status(500).json({status:500,error:"500",message:"Internal Server Error"});        
    }
}

const getVideoListByLevelId = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id;
        const video = await Video.findAll({
            where:{
                levelId:id
            }
        });

        if(video.length === 0){
            res.status(404).json({status:404,error:"404",message:`Videos of level Id ${id} are not found`});
            return;
        }
        res.status(200).json(video);
        
    } catch (error) {
        console.log('error', error);
        res.status(500).json({status:500,error:"500",message:"Internal Server Error"});  
    }
}

const createVideo = async(req:Request, res:Response) =>{
    try {
        const {languageId,levelId,lessonId,videoName,videoThumbnail,videoFileName} = req.body;
        const video = await Video.create({
            languageId:languageId,
            levelId:levelId,
            lessonId:lessonId,
            videoName:videoName,
            videoThumbnail:videoThumbnail,
            videoFileName:videoFileName,
            dateCreated:Date.now(),
            dateModified:Date.now()
        });

        if(!video){
            res.status(400).json({status:400,error:"400",message:"Failed to create a video"});
            return;
        }

        res.status(201).json({message:"Video created successfully",video});
    } catch (error) {
        console.log('error', error);
        res.status(500).json({status:500,error:"500",message:"Internal Server Error"});  
    }
}

const updateVideoByVideoId = async(req:Request, res:Response) =>{
    try {
        const vd = req.body;
        const videoId = req.params.id;

        const video = await Video.update(
            {vd,dateModified: Date.now()},
            {
                where:{videoId:videoId},
                returning: true,
            }
            );

            if(!video){
                res.status(400).json({status:400,error:"400",message:`Failed to update a video Id ${videoId}`});
                return;
            }
            const videoDetails = await Video.findByPk(videoId);

            res.status(200).json({message:"Vedio updated successfully",videoDetails});
    } catch (error) {
        console.log('error', error);
        res.status(500).json({status:500,error:"500",message:"Internal Server Error"}); 
    }
}

export {
    getAllVideoList,
    getVideoListByLevelId,
    createVideo,
    updateVideoByVideoId
}