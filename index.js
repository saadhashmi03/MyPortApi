const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { connectDB } = require("./connection");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// connection to db
connectDB();

// allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://my-port-frontend.vercel.app",
  "https://my-port-frontend-8ozpswg1n-saadhashmi03s-projects.vercel.app"
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", routes);

// listening to server
app.listen(port, () => console.log(`server is running on ${port}`));
