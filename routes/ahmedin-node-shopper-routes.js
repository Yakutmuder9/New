/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   29 Apirl 2023
; Description: User's API
;===========================================
*/
import express from "express";
import Customer from "./../models/ahmedin-customer.js";
const router = express.Router();

/**
 * @openapi
 * tags: 
 *   name: Customers
 */

/**
 * @openapi
 * /api/customers:
 *   post:
 *     tags: [Customers]
 *     description: Creates a new customer.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */


router.post("/", async (req, res) => {
  try {
    const newCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    };
    await Customer.create(newCustomer);
    res.status(200).send("Customer added to MongoDB");
  } catch (err) {
    console.error(err);
    if (err instanceof mongoose.Error) {
      res.status(501).send("MongoDB Exception");
    } else {
      res.status(500).send("Server Exception");
    }
  }
});
router.post("/", async (req, res) => {});
router.post("/", async (req, res) => {});

export default router;