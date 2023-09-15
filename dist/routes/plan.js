"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const plan_1 = require("../controllers/plan");
const router = express_1.default.Router();
router.get("/getAllPlanList", plan_1.getAllPlanList);
router.post("/getPlansByLanguageId", plan_1.getPlansByLanguageId);
exports.default = router;
