import express, {Request, Response} from "express";
import sequelize from "../config/db";
import Plan from "../models/plan";
import User from "../models/user";
import Order from "../models/order";


const createPlan = async(req:Request, res:Response) => {

    const plan = await Plan.create({
        languageId: req.body.languageId,
        levels: req.body.levels,
        planName: req.body.planName,
        planSubtitle: req.body.planSubtitle,
        planPrice: req.body.planPrice,
        planDuration: req.body.planDuration,
        planDesc: req.body.planDesc,
        status: req.body.status,
        isLivePlan: req.body.isLivePlan,
        dateCreated: Date.now(),
        dateModified: Date.now()
    })
}


const getAllPlanList = async(req:Request, res:Response) => {
    try {
        const plan = await Plan.findAll({
            attributes : ["planId","planName","planPrice","planDuration"],
        });

        if(plan.length === 0){
            res.status(404).json({status:404, error:"404",message:"Plans Not Available"});
       return;
        }

        res.status(200).json(plan);

    } catch (error) {
        
    }
}

const getPlansByLanguageId = async(req:Request, res:Response) =>{
  try {
    const users = req.body;
    // console.log('userId', userId)

    const user = await User.findByPk(users.userId)
    // res.send(user).status(200);
    console.log("User = ", user);
  
    if (!user) {
      res.status(404).json({status:404,error:"404",message:"User Not Found"});
    return;
    }
    console.log('user Name = ', user.dataValues.fullName);

    const plans = await Plan.findAll({
      where:{
        languageId : user.dataValues.languageId
      }
    });
    console.log('plans', plans)

    if (plans.length === 0) {
      return res.status(400).json({ error: 'No subscription plans available for the selected language' });
      return;
    }

    const result = await Promise.all(
      plans.map(async (plan) => ({
        planId: plan.dataValues.planId,
        planName: plan.dataValues.planName,
        planSubtitle: plan.dataValues.planSubtitle,
        planPrice: plan.dataValues.planPrice,
        planDuration: plan.dataValues.planDuration,
        planDesc: JSON.parse(plan.dataValues.planDesc), // Assuming planDesc is stored as a string
        isPurchased: await getOrdersByPlanId(users.userId, plan.dataValues.planId), // Implement this function
      }))
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
}

// const updatePlanByPlanId = async(req:Request, res:Response) =>{

// }

const getOrdersByPlanId =  (userId: number, planId: number) => {
    try {
      const orders = Order.findAll({
        where: {
          userId: userId,
          planId: planId,
          status: "paid"
        }
      });
let isPurchased = null;
      if(!orders){
        isPurchased = false;
        console.log('isPurchased', isPurchased)

      }else{
        isPurchased = true;
        console.log('isPurchased', isPurchased)
      }
      console.log(orders);
      return isPurchased;
    } catch (error) {
      console.error(error);
      throw error;
      
    }
  };
  
export {
    getAllPlanList,
    getPlansByLanguageId
}