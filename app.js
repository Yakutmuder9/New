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
import swaggerJSDoc from "swagger-jsdoc";
import composerRouter from "./routes/ahmedin-composer-routes.js"; 
import personRouter from "./routes/ahmedin-person-routes.js";
import userRouter from "./routes/ahmedin-session-routes.js";
import customerRouter from "./routes/ahmedin-node-shopper-routes.js";

// Middleware
dotenv.config();

// Constatnt
const app = express();
const port = process.env.PORT || 3000;
// const url = process.env.MONGODB_URL;  
const url = "mongodb+srv://web420_user:1234@cluster0.pbxmoid.mongodb.net/web420DB?retryWrites=true&w=majority";

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
app.use('/api/persons', personRouter);
app.use('/api', userRouter);
app.use('/api/customers', customerRouter)

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "WEB 420 Restful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
}; 
 
// Documentation
const swaggerDocs = swaggerJSDoc(swaggerOptions);
// const swaggerDocs = YAML.load("./docs/ahmedin-composer.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// start the server 
app.listen(port, () => {
  console.log(`Application started and listening on port ${port}!`);
});
