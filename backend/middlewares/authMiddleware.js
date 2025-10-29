const jwt = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.json({ success: false, message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({success: false, message: "Invalid token" });
    req.user = decoded;
    next();
  });
};


module.exports = { verifyToken };