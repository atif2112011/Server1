const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/employees", userRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));



const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
