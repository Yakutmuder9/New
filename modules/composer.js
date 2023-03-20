/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   19 March 2023
; Description: Composer API
;===========================================
*/
import mongoose from "mongoose";

const composerSchema = new mongoose.Schema({
    name: String,
    birthYear: Number,
    deathYear: Number,
    nationality: String,
});

export default mongoose.model("Composer", composerSchema);