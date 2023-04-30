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
 *     summary: Creates a new customer
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

/**
 * @openapi
 * /api/customers/:username/invoices :
 *   post:
 *     tags: [Customers]
 *     summary: Creates an invoce by username.
 *     description: Creates an invoce by username.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               subtotal:
 *                 type: string
 *               tax:
 *                 type: string
 *               dateCreated:
 *                 type: string
 *               dateShipped:
 *                 type: string
 *               lineItems:
 *                 type: []
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

// Create a new invoice for the given username
router.post("/:username/invoices", async (req, res) => {
  try {
    const customer = await Customer.findOne({ userName: req.params.username });
    if (!customer) {
      res
        .status(404)
        .send(`No customer found with username: ${req.params.username}`);
      return;
    }
    const newInvoice = {
      subtotal: req.body.subtotal,
      tax: req.body.tax,
      dateCreated: req.body.dateCreated,
      dateShipped: req.body.dateShipped,
      lineItems: req.body.lineItems,
    };
    customer.invoices.push(newInvoice);
    const savedCustomer = await customer.save();
    res.status(200).json("Customer added to MongoDB", savedCustomer);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) {
      res.status(501).send("MongoDB Exception");
    } else {
      res.status(500).send("Server Exception");
    }
  }
});

/**
 * @openapi
 * /api/customers/{username}/invoices:
 *   get:
 *     tags: [Customers]
 *     summary: Find all invoices for a customer by their username
 *     description: Retrieve a list of invoices for a customer by their username
 *     parameters:
 *       - in: path
 *         name: username
 *         description: The username of the customer to retrieve invoices for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved invoices for customer
 *       '500':
 *         description: Internal server error
 *       '501':
 *         description: Error retrieving invoices from database
 */
// Find all invoices for the given username
router.get("/:username/invoices", async (req, res) => {
  try {
    const customer = await Customer.findOne({ userName: req.params.username });
    if (!customer) {
      res
        .status(404)
        .send(`No customer found with username: ${req.params.username}`);
      return;
    }
    res.status(200).json(customer.invoices);
  } catch (error) {
    console.error(error);
    if (error instanceof mongoose.Error) {
      res.status(501).send("MongoDB Exception");
    } else {
      res.status(500).send("Server Exception");
    }
  }
});

export default router;
