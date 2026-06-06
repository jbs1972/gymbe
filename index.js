const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const connectDatabase = require("./config/db.config");
const config = require("./config/env.config");
const swaggerSpec = require("./config/swagger.config");
const memberProfileRouter = require("./routes/MemberProfileRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/member_profiles", memberProfileRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Gym Management API", docs: "http://localhost:3001/api-docs" });
});

// Connect to MongoDB
connectDatabase();

// Start Server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

module.exports = app;