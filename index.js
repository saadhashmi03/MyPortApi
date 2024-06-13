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
  "https://saadhashmi-portfolio.vercel.app",
  "my-port-frontend-iqbf4hh6h-saadhashmi03s-projects.vercel.app"
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request Origin:", origin); // Log the origin of the request
    console.log("Allowed Origins:", allowedOrigins); // Log the allowed origins list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS");
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
