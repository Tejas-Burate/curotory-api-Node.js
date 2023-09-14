import jwt, {Secret} from "jsonwebtoken";
import { Request,Response } from 'express';
import User from "../models/user";
import Language from '../models/language';
import dotenv from "dotenv";

const emailLogin = async(req:Request,res:Response) =>{
    try {
        const body = req.body;

        const user = await User.findOne({
            where:{
                email:body.email,
                password:body.password,
                deviceRegistrationToken: body.deviceRegistrationToken
            }
        })
           console.log("User = ", user);
        if(!user){
            res.status(404).json({status:404,error:"404",message:"Invalid email and password"});
            return;
        }

        const language = await Language.findOne({
            where:{ languageId : user.dataValues.languageId}
        });

        if(!language){
            res.status(404).json({status:404,error:"404",message:"Language Id of Given User is not found"});
            return;
        }
const id = process.env.JWT_TOKEN_SECRET as Secret;
console.log('id', id);

        const accessToken = jwt.sign(
            {
                email: user.dataValues.email
            },
            "12345",
            // process.env.JWT_TOKEN_SECRET as Secret,
            { expiresIn: "20m" }
          );
        console.log("accessToken",accessToken);

        const result = {
            userId:user.dataValues.userId,
            email:user.dataValues.email,
            role:user.dataValues.roleId,
            fullName:user.dataValues.fullName,
            mobile:user.dataValues.mobile,
            language:{
                languageId:language.dataValues.languageId,
                languageName:language.dataValues.languageName,
                languageObj:JSON.parse(language.dataValues.languageObj),
            },
            dateOfBirth:user.dataValues.dateOfBirth,
            profileImage:user.dataValues.profileImage,
            token:null,
            userType:null
        };
        res.status(200).json(result);
    } catch (error) {
        console.log('error', error)
        res.status(500).json({status:500,error:"500",message:"Internal Server Error"});
    }
}

export {emailLogin}