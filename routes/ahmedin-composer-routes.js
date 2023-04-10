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

// Get a list of all composers           
router.get("/", async (req, res) => {
  try {
    const composers = await Composer.find();
    res.json(composers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a composer by ID
router.get("/:id", async (req, res) => {
  try {
    const composer = await Composer.findById(req.params.id);
    res.json(composer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create new composer
router.post("/", async (req, res) => {
  const composer = new Composer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
 
  console.log(composer);
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
