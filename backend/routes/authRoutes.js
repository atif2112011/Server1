const express = require("express");
const { loginUser, refreshToken, logoutUser, userProfile } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", logoutUser);

// Example protected route
router.get("/profile", verifyToken,userProfile);


module.exports= router;
