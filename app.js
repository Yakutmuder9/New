/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   19 March 2023
; Description: Composer API
;===========================================
*/
import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
// import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import YAML from "yamljs"; 
import composerRouter from "./routes/composer.js"; 

// Constatnt
const app = express();
const port = process.env.PORT || 3000;
// const url = process.env.MONGODB_URL;
const url = "mongodb://localhost:27017/composer";

mongoose.set("strictQuery", false);

// connect mongoDB url
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(
  () => console.log("MongoDB connected Successfully!"),
  (err) => console.log(err)
);

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/composers', composerRouter);

// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: "3.0.0",
//     info: {
//       title: "WEB 420 Restful APIs",
//       version: "1.0.0",
//     },
//   },
//   apis: ["./routes/*.js"],
// };

// const swaggerDocs = swaggerJSDoc(swaggerOptions);
const swaggerDocument = YAML.load("./docs/ahmedin-composer.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// start the server
app.listen(port, () => {
  console.log(`Application started and listening on port ${port}!`);
});
