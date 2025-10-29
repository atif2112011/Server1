const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDB, createAdmin } = require("./db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./middlewares/authMiddleware");

dotenv.config();

// Check if we're running inside a pkg executable
const isPkg = typeof process.pkg !== "undefined";

// If in pkg, use the directory of the executable.
// Otherwise, use the normal __dirname for development.
const baseDir = isPkg ? path.dirname(process.execPath) : __dirname;
console.log("Base directory:", baseDir);
console.log("Frontend directory:", path.join(baseDir, "../../frontend/dist"));

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173", // allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/employees", verifyToken, userRoutes);
app.use("/api/auth", authRoutes);

// Serve frontend build
isPkg
  ? app.use(express.static(path.join(baseDir, "../../frontend/dist")))
  : app.use(express.static(path.join(baseDir, "../frontend/dist")));

// isPkg
//   ? app.get("/", (req, res) => {
//       res.sendFile(path.join(baseDir, "../../frontend/dist/index.html"));
//     })
//   : app.get("/", (req, res) => {
//       res.sendFile(path.join(baseDir, "../frontend/dist/index.html"));
//     });



isPkg?app.use((req, res,next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(baseDir, '../../frontend/dist', 'index.html'));
  } else {
    next(); // Pass to the next handler (likely a 404 error)
  }
}):
app.use((req, res,next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(baseDir, '../frontend/dist', 'index.html'));
  } else {
    next(); // Pass to the next handler (likely a 404 error)
  }
})    


const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
  createAdmin();
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
