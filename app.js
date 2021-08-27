const express = require("express");
const productRouter = require("./routes/productRoutes");
const rateLimit = require("express-rate-limit"); //for brute force attack
const mongoSanitize = require("express-mongo-sanitize"); //for noSql query injections
const xss = require("xss-clean"); //for XSS attack (remove script tags)

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "you've exceed the number of requests",
});

const app = express();

//serving static content
app.use(express.static("public"));
//middlewares
app.use(limiter);
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

// test route
app.use("/test", (req,res)=>{
  res.status(200)
  .json({
    message: "Working",
    success: true
  })
});

// routes
app.use("/api/v1/products", productRouter);


module.exports = app;
