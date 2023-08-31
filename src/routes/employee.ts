import express from 'express';
import Employee from '../models/employee'; // Corrected path to "models"

const router = express.Router();

router.get('/getAllEmployees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    console.log(employees);
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
