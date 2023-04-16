/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   09 April 2023
; Description: Composer API
;===========================================
*/
import express from "express";
import Composer from "../models/ahmedin-composer.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Composers
 */

/**
 * @openapi
 * /api/composers:
 *   get:
 *     summary: Returns a list of all famous composers
 *     tags: [Composers]
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description:  Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// Get a list of all composers
router.get("/", async (req, res) => {
  try {
    const composers = await Composer.find();
    res.json(composers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     summary: Get a composer by ID
 *     tags: [Composers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the composer to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description:  Server Exception
 *       501:
 *         description: MongoDB Exception
 */
// Get a composer by ID
router.get("/:id", async (req, res) => {
  try {
    const composer = await Composer.findById(req.params.id);
    if (!composer) {
      return res.status(404).json({ message: "Cannot find composer" });
    }
    res.json(composer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 

/**
 * @swagger
 * /api/composers:
 *   post:
 *     summary: Create a new composer
 *     tags: [Composers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description:  Server Exception
 *       501:
 *         description: MongoDB Exception
 */

// create new composer
router.post("/", async (req, res) => {
  const composer = new Composer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  try {
    const newComposer = await composer.save();
    res.status(201).json(newComposer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
