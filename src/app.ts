import express from 'express';
import moment from "moment-timezone";
import dotenv from "dotenv";
import {currentDateTime} from "./config/tz";
import sequelize from './config/db';
import employeeRoutes from './routes/employee'; // Corrected path to "routes"
import roleRoutes from "./routes/role";
import userRoutes from "./routes/user";
import languageRoutes from "./routes/language";
import levelRoutes from "./routes/level";


const app = express();

moment.tz.setDefault("Asia/Kolkata");

console.log(currentDateTime());

//Middlewares
app.use(express.json());
app.use(express.static('public'));

// const timestamp = 1693560172596;


//Routes
app.use('/employee', employeeRoutes);
app.use("/",roleRoutes);
app.use("/",userRoutes);
app.use("/",languageRoutes);
app.use("/",levelRoutes);

const port = process.env.PORT || 8000;



sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected to the database`);
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
