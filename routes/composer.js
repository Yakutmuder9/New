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

router.get("/", async (req, res) => {
  try {
    const composer = await Composer.findById();
    if (composer) {
      res.json(composer);
    } else {
      res.status(404).json({ error: "Composer not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/:id", async (req, res) => {
  const composer = await Composer.findById(req.params.id);
  res.json(composer);
});

router.post("/", async (req, res) => {
  const composer = new Composer(req.body);
  await composer.save();
  res.json(composer);
});

router.put("/:id", (req, res) => {
  res.status(200).send("Composer results");
});

router.delete("/:id", (req, res) => {
  res.status(200).send("Composer results");
});

export default router;
