/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   09 April 2023
; Description: Composer API
;===========================================
*/
import mongoose from 'mongoose';

const composerSchema = new mongoose.Schema({
  firstName:  String,
  lastName: String, 
});

const Composer = mongoose.model('Composer', composerSchema);

export default Composer;