/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   15 Apirl 2023
; Description: Composer API
;===========================================
*/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// role Schema 
const roleSchema = new Schema({
  text: String
});

// dependent Schema
const dependentSchema = new Schema({
  firstName: String,
  lastName: String
});

// person Schema
const personSchema = new Schema({
  firstName: String,
  lastName: String, 
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: String
});

const Person = mongoose.model('Person', personSchema);

export default Person;
