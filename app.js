/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   09 April 2023
; Description: Composer API
;===========================================
*/
import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import YAML from "yamljs"; 
import composerRouter from "./routes/ahmedin-composer-routes.js"; 
// Middleware
dotenv.config();

// Constatnt
const app = express();
const port = process.env.PORT || 5000;
const url = process.env.MONGODB_URL;  
// const url = "mongodb://localhost:27017/composer";

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
 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/composers', composerRouter);

const swaggerDocument = YAML.load("./docs/ahmedin-composer.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// start the server
app.listen(port, () => {
  console.log(`Application started and listening on port ${port}!`);
});
