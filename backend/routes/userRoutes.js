const express = require("express");
const User= require("../models/User.js");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({success: true, data: users});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
});

// POST add new user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({success: true, data: user});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({success: true});
  } catch (err) {
    res.status(500).json({success: false, message: err.message});
  }
});

module.exports = router;
