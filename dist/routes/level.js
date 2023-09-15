"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const level_1 = require("../controllers/level");
const router = express_1.default.Router();
router.post("/createLevel", level_1.createLevel);
router.get("/getLevelsByLevelId/:id", level_1.getLevelsByLevelId);
router.get("/getAllLevelsByLanguageId/:id", level_1.getAllLevelsByLanguageId);
router.put("/updateLevelByLevelId/:id", level_1.updateLevelByLevelId);
exports.default = router;
