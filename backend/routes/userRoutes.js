const express = require("express");
const Employee= require("../models/Employee.js");

const router = express.Router();

// GET all Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({success: true, data: employees});
  } catch (err) {
    res.json({success: false, message: err.message});
  }
});

// POST add new Employee
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const employee = new Employee({ name, email });
    await employee.save();
    res.status(201).json({success: true, data: employee});
  } catch (err) {
    res.json({success: false, message: err.message});
  }
});

// DELETE a employee
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    res.json({success: true});
  } catch (err) {
    res.json({success: false, message: err.message});
  }
});

module.exports = router;
