const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Generate Tokens
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, ACCESS_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: "7d" });
};

// Login Controller
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false, message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set refresh token in HttpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // true in production with HTTPS
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({success: true,message: "Login successful", accessToken });
};

// Refresh Token Controller
const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.json({ success: false, message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    // const newAccessToken = jwt.sign({ id: decoded.id }, ACCESS_SECRET, { expiresIn: "15m" });
    const newAccessToken=generateAccessToken({_id:decoded.id});
  
    return res.json({ success: true, message: "Token refreshed", accessToken: newAccessToken });
  } catch (err) {
    return res.json({ success: false, message:err.message });
  }
};

// Logout Controller
const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken", { path: "/" });
  res.json({ success: true, message: "Logged out successfully" });
};

//User Profile
const userProfile=async(req,res)=>{
  try {
    const user=await User.findById(req.user.id);
    if(!user) return res.json({success: false, message: "User not found"});
    return res.json({success: true, data: user});
    
  } catch (error) {
    return res.json({success: false, message: error.message});
  }
}

module.exports = { loginUser, refreshToken, logoutUser,userProfile };
