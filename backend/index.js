// Load environment variables and modules
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileupload = require("express-fileupload");
const passport = require("./config/passport"); // Passport configuration
const db = require("./config/database"); // Database configuration
const cloudinary = require("./config/cloudinary"); // Cloudinary configuration

// Initialize Express app
const app = express();

// Define the PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = ["https://gdg-website-2025-delta.vercel.app","http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Allow cookies if needed
  })
);

// File Upload Middleware
app.use(
  fileupload({
    useTempFiles: true, // Enables temporary file storage
    tempFileDir: "/tmp/", // Temporary directory for uploaded files
  })
);

// Initialize Passport middleware
app.use(passport.initialize());

// Connect to the database
db.connect();

// Connect to Cloudinary
cloudinary.cloudinaryConnect();

// Routes
const uploadRoutes = require("./routes/FileUpload"); // File upload routes
const authRoutes = require("./routes/userRoute"); // User authentication routes
const enquiryRoutes = require("./routes/registerRoute"); // Event registration routes

// API route mounting
app.use("/api/auth", authRoutes);          // Standard auth routes
app.use("/api/auth/upload", uploadRoutes); // File upload routes
app.use('/api/auth/enquiry',enquiryRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json("Hello, Welcome to the GDG Website API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
