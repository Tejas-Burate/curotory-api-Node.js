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
exports.getDropdownRoleList = void 0;
const role_1 = __importDefault(require("../models/role")); // Corrected import statement
const sequelize_1 = require("sequelize");
const getDropdownRoleList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_1.default.findAll({
            attributes: ['roleId', 'roleName'],
            where: {
                roleId: {
                    [sequelize_1.Op.in]: [0, 3],
                },
            },
        });
        // const role = await Role.findAll();
        if (roles.length === 0) {
            res.status(404).json({ status: 404, error: "404", message: "Roles Data Not Found" });
        }
        res.status(200).json(roles);
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ status: 500, error: "500", message: "Internal server error" });
    }
});
exports.getDropdownRoleList = getDropdownRoleList;
// export default {
//   getDropdownRoleList,
// };
