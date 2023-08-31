import { Request, Response } from "express";
import User from "../models/user";
import TeacherDetails from "../models/teacherDetails"
import sequelize from '../config/db';

 const getUserDetails = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const userData = await User.findAll({
        where: {
          userId : id
        },
      });
  
      if (userData.length === 0) {
        res.status(404).json({ status: 404, error: "404", message: "User Data Not Found" });
      } else {
        res.status(200).json(userData);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
    }
};


const getTeachersList = async (req: Request, res: Response) => {
  try {
      const query = 'SELECT user.fullName, teacherdetails.* FROM `user` INNER JOIN `teacherdetails` ON user.userId = teacherdetails.userId';
      const [result] = await sequelize.query(query); // Destructure the result array directly

      if (result.length === 0) {
          return res.status(404).json({ status: 404, error: "404", message: "User Data Not Found" });
      }

      return res.status(200).json(result);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, error: "500", message: "Internal Server Error" });
  }
}

  
  export {getUserDetails,getTeachersList}