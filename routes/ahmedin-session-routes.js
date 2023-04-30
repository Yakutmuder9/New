/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   23 Apirl 2023
; Description: User's API
;===========================================
*/

/**
 * @openapi
 * tags:
 *   name: Users
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *         Password:
 *           type: string
 *         emailAddress:
 *           type: array
 */
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/ahmedin-user.js";

const router = express.Router();
const saltRounds = 10;

// Signup Operation
/**
 * @openapi
 * /api/signup:
 *   post:
 *     summary: Registers a new user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *               emailAddress:
 *                 type: Array
 *                 description: User's email address
 *     responses:
 *       200:
 *         description: Registered user
 *       401:
 *         description: Username is already in use
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.post("/signup", async (req, res) => {
  try {
    const { userName, password, emailAddress } = req.body;
    //  check user username
    const user = await User.findOne({ userName });

    if (!user) {
      // Hash the user's password using bcrypt
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
      const newRegisteredUser = {
        userName,
        password: hashedPassword,
        emailAddress,
      };

      // Create the new user
      const registeredUser = await User.create(newRegisteredUser);
      res.status(200).send("Registered user");
    } else {
      res.status(401).send("Username is already in use");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Exception");
  }
});
 
// Login Operation
/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Logged in user
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Server Exception
 *       501:
 *         description: MongoDB Exception
 */
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    console.log(user);
    // Compare the entered password
    let passwordIsValid = bcrypt.compareSync(password, user.password);

    if (user && passwordIsValid) {
      res.status(200).send("Logged in user");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {  
    console.error(error);  
    res.status(500).send("Server Exception"); 
  }
});

export default router;
