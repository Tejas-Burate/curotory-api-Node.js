import Role from "../models/role"; // Corrected import statement
import { Request, Response } from "express";
import { Op } from "sequelize";

export const getDropdownRoleList = async (req:Request, res:Response) => {
  try {
    const roles = await Role.findAll({
      attributes: ['roleId','roleName'],
      where: {
        roleId: {
          [Op.in]: [0, 3],
        },
      },
    });
    // const role = await Role.findAll();
    if (roles.length === 0) {
      res.status(404).json({ status: 404, error: "404", message: "Roles Data Not Found" });
    }
    res.status(200).json(roles);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: 500, error: "500", message: "Internal server error" });
  }
};

// export default {
//   getDropdownRoleList,
// };
