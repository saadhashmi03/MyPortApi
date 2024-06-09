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

// middlewares
app.use(cors({ origin: "https://my-port-frontend.vercel.app/", credentials: true }));

  
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", routes);

// listening to server
app.listen(port, () => console.log(`server is running on ${port}`));

