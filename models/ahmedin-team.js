/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:  09 May 2023
; Modified-By: Yakut Ahmedin
; Description: Team Shcema
;===========================================
*/
import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Player schema
const playerSchema = Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salary: { type: Number, required: true },
});

// Define the Team schema
const teamSchema = new Schema({
  name: { type: String, required: true },
  mascot: { type: String },
  players: [playerSchema],
});

// Define the Team model
const Team = mongoose.model("Team", teamSchema);

export default Team;
