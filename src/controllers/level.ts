import express from "express";
import { Request, Response } from 'express';
import sequelize from "sequelize";
import Level from '../models/level';

const createLevel = async(req:Request, res:Response) =>{
    try {
        const levelData = req.body;

        const level = await Level.build({
            languageId : levelData.languageId,
            levelName : levelData.levelName,
            dateCreated : Date.now(),
            dateModified: Date.now()
        })

        if(!level){
            res.status(400).json({status:400,error:"400",message:"Unable to create new level.."});
            return;
        }

        await level.save();
        res.status(201).json(level);
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation error
            const validationErrors = error.errors.map((err : any) => ({
              field: err.path,
              message: err.message,
            }));
            res.status(400).json({
              status: 400,
              error: 'Bad Request',
              message: 'Validation error',
              validationErrors,
            });
          } else{
            console.error(error);
            res.status(500).json({
              status: 500,
              error: 'Internal Server Error',
              message: 'An error occurred while saving the level.',
            });
          }
    }
}

const getLevelsByLevelId = async(req:Request, res:Response) => {
    try {
        const id = req.body.userId;
        console.log('id', id)
        const level = await Level.findAll({
            where:{languageId: id},
    });
        if(!level){
            res.status(400).json({status:400,error:400,message:"Level of given id is not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });

    }
}

const getAllLevelsByLanguageId = async(req:Request, res:Response) =>{
    try {

        const id = req.params.id;

        const level = await Level.findAll({
            attributes: ["levelId","languageId"],
                
            where: {
                languageId : id
            },

        });

        if(!id){
            res.status(400).json({status:404,error:"404", message: "Level of given id is not found"});
            return;
        }

        res.status(200).json(level);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
 
    }
}

const updateLevelByLevelId = async(req:Request, res:Response) =>{
    try {
        const id = req.params.id;

        const validateLevelId = await Level.findAll({
            where: { levelId : id},
        });

        if(validateLevelId.length === 0){
            res.status(404).json({status:400,erorr:"400",message:"level Id not found"});
            return;
        }
        
        const level = await Level.update(req.body, {
            where: {levelId : id},
            returning : true,
        });

        if(!level){
            res.status(400).json({status:400, error:400, message:`Unable to update category of id ${id}` });
            return;
        }
console.log(level)
        res.status(200).json(await Level.findAll({ where: { levelId : id}}));
    } catch (error: any) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation error
            const validationErrors = error.errors.map((err : any) => ({
              field: err.path,
              message: err.message,
            }));
            res.status(400).json({
              status: 400,
              error: 'Bad Request',
              message: 'Validation error',
              validationErrors,
            });
          } else{
            console.error(error);
            res.status(500).json({
              status: 500,
              error: 'Internal Server Error',
              message: 'An error occurred while saving the level.',
            });
          }
    }
}

export { 
    createLevel, 
    getLevelsByLevelId ,
    getAllLevelsByLanguageId,
    updateLevelByLevelId
}