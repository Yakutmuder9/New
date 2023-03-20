/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   19 March 2023
; Description: Composer API
;===========================================
*/
import mongoose from 'mongoose';

const composerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthYear: Number,
  deathYear: Number,
  nationality: String,
});

const Composer = mongoose.model('Composer', composerSchema);

export default Composer;