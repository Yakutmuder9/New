/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   19 March 2023
; Description: Composer API
;===========================================
*/
import express from "express";
import Composer from "../modules/composer.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Composer:
 *       type: object
 *       required:
 *         - name
 *         - birthYear
 *         - deathYear
 *         - nationality
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the composer.
 *         name:
 *           type: string
 *           description: The name of the composer.
 *         birthYear:
 *           type: integer
 *           description: The birth year of the composer.
 *         deathYear:
 *           type: integer
 *           description: The death year of the composer.
 *         nationality:
 *           type: string
 *           description: The nationality of the composer.
 *       example:
 *         name: Johann Sebastian Bach
 *         birthYear: 1685
 *         deathYear: 1750
 *         nationality: German
 */




/**
 * @swagger
 * /composers:
 *   get:
 *     summary: Returns a list of all famous composers
 *     tags: [Composers]
 *     responses:
 *       200:
 *         description: A list of famous composers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Composer'
 *       500:
 *         description: Internal server error
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
 * @swagger
 * /composers/{id}:
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
 *         description: A composer with the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Composer'
 *       404:
 *         description: Cannot find composer with the given ID
 *       500:
 *         description: Internal server error
 */

// Get a composer by ID
router.get("/:id", async (req, res) => {
  try {
    const composer = await Composer.findById(req.params.id);
    if (composer == null) {
      return res.status(404).json({ message: "Composer not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /composers:
 *   post:
 *     summary: Create a new composer
 *     tags: [Composers]
 *     requestBody:
 *       description: The composer to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Composer'
 *     responses:
 *       201:
 *         description: The created composer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Composer'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


router.post("/", async (req, res) => {
  const composer = new Composer({
    name: req.body.name,
    birthYear: req.body.birthYear,
    deathYear: req.body.deathYear,
    nationality: req.body.nationality,
  });

  try {
    const newComposer = await composer.save();
    if (composer == null) {
      return res.status(404).json({ message: "Cannot find composer" });
    }
    res.status(201).json(newComposer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
