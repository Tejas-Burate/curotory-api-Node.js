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
exports.getPlansByLanguageId = exports.getAllPlanList = void 0;
const plan_1 = __importDefault(require("../models/plan"));
const user_1 = __importDefault(require("../models/user"));
const order_1 = __importDefault(require("../models/order"));
const createPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plan = yield plan_1.default.create({
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
    });
});
const getAllPlanList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plan = yield plan_1.default.findAll({
            attributes: ["planId", "planName", "planPrice", "planDuration"],
        });
        if (plan.length === 0) {
            res.status(404).json({ status: 404, error: "404", message: "Plans Not Available" });
            return;
        }
        res.status(200).json(plan);
    }
    catch (error) {
    }
});
exports.getAllPlanList = getAllPlanList;
const getPlansByLanguageId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = req.body;
        // console.log('userId', userId)
        const user = yield user_1.default.findByPk(users.userId);
        // res.send(user).status(200);
        console.log("User = ", user);
        if (!user) {
            res.status(404).json({ status: 404, error: "404", message: "User Not Found" });
            return;
        }
        console.log('user Name = ', user.dataValues.fullName);
        const plans = yield plan_1.default.findAll({
            where: {
                languageId: user.dataValues.languageId
            }
        });
        console.log('plans', plans);
        if (plans.length === 0) {
            return res.status(400).json({ error: 'No subscription plans available for the selected language' });
            return;
        }
        const result = yield Promise.all(plans.map((plan) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                planId: plan.dataValues.planId,
                planName: plan.dataValues.planName,
                planSubtitle: plan.dataValues.planSubtitle,
                planPrice: plan.dataValues.planPrice,
                planDuration: plan.dataValues.planDuration,
                planDesc: JSON.parse(plan.dataValues.planDesc),
                isPurchased: yield getOrdersByPlanId(users.userId, plan.dataValues.planId), // Implement this function
            });
        })));
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getPlansByLanguageId = getPlansByLanguageId;
// const updatePlanByPlanId = async(req:Request, res:Response) =>{
// }
const getOrdersByPlanId = (userId, planId) => {
    try {
        const orders = order_1.default.findAll({
            where: {
                userId: userId,
                planId: planId,
                status: "paid"
            }
        });
        let isPurchased = null;
        if (!orders) {
            isPurchased = false;
            console.log('isPurchased', isPurchased);
        }
        else {
            isPurchased = true;
            console.log('isPurchased', isPurchased);
        }
        console.log(orders);
        return isPurchased;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
