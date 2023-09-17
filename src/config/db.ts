import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "",
  database: "curotory",

  // dialect: "mysql",
  // host: "localhost",
  // username: "root",
  // password: "",
  // database: "curotory", // Replace with your database name
});

export default sequelize;
