// Load environment variables and modules
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileupload = require("express-fileupload");
const passport = require("./config/passport"); // Passport configuration
const app = express();
// Define the PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
     origin: ["https://gdg-website-2025-delta.vercel.app"], // Allow requests from your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests (if needed)
  })
);

app.use(
  fileupload({
    useTempFiles: true, // Enables temporary file storage
    tempFileDir: "/tmp/", // Temporary directory for uploaded files
  })
);

// Initialize Passport middleware
app.use(passport.initialize());

// Connect to database
const db = require("./config/database");
db.connect();

// Connect to cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// API route mounting
const uploadRoutes = require("./routes/FileUpload"); // File upload routes
const authRoutes = require("./routes/userRoute"); // User authentication routes
const oauthRoutes = require("./routes/authRoutes"); // OAuth routes (Google, GitHub, Twitter)

// Root endpoint
app.get("/", (req, res) => {
  res.json("Hello");
});

// Mount API routes
app.use("/api/auth", authRoutes); // Standard authentication routes
app.use("/api/auth/upload", uploadRoutes); // File upload routes
app.use("/", oauthRoutes); // OAuth routes (Google, GitHub, Twitter)

// Activate server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});