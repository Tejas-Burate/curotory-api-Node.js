"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_1 = require("../controllers/role");
// import { default } from '../controllers/role';
const router = express_1.default.Router();
router.get('/getDropdownRoleList', role_1.getDropdownRoleList);
exports.default = router;
