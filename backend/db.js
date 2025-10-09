const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
