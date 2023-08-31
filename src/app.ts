import express from 'express';
import sequelize from './config/db';
import employeeRoutes from './routes/employee'; // Corrected path to "routes"
import roleRoutes from "./routes/role";
import userRoutes from "./routes/user";

const app = express();

app.use(express.json()); // To parse JSON data

app.use('/employee', employeeRoutes);
app.use("/",roleRoutes);
app.use("/",userRoutes);

const port = process.env.PORT || 8000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
