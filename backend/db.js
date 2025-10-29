const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt= require("bcryptjs");

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

const createAdmin=async()=>{
    try {
        const admin=await User.findOne({username:"admin"});
        if(!admin)
        {
          const password=await bcrypt.hash("admin",10);
          await User.create({
            username:"admin",
            password:password 
          })
        }
    } catch (err) {
        console.error(" Admin creation failed", err);

    }
}

module.exports = {connectToDB,createAdmin};
