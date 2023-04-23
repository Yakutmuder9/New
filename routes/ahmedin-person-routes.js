/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   15 Apirl 2023
; Description: Composer API
;===========================================
*/


/**
 * @openapi
 * tags:
 *   name: Persons
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Role'
 *         dependents:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Dependent'
 *         birthDate:
 *           type: string
 *     Role:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *
 *     Dependent:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 */
import express from 'express';
import Person from '../models/ahmedin-person.js'; 

const router = express.Router();


/**
 * @openapi
 * /api/persons:
 *   get:
 *     summary: Get all persons.
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: Array of person documents.
 *       500:
 *         description: Server exception.
 *       501:
 *         description: MongoDB exception.
 */
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server exception'); 
  }
});

/**
 * @openapi
 * /api/persons:
 *   post:
 *     summary: Create a new person.
 *     tags: [Persons]
 *     requestBody:
 *       content:
  *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: Array of person documents.
 *       500:
 *         description: Server exception.
 *       501:
 *         description: MongoDB exception.
 */
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, roles, dependents, birthDate } = req.body;
    const newPerson = new Person({
      firstName,
      lastName,
      roles,
      dependents,
      birthDate
    });
    const savedPerson = await newPerson.save();
    res.status(200).json(savedPerson);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server exception');
  } 
});

export default router; 
