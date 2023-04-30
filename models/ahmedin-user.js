/*
============================================
; Title:  app.js
; Author: Professor Krasso
; Date:   23 Apirl 2023
; Description: User's API
;===========================================
*/

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String,
  emailAddress: Array,
});

const User = mongoose.model("User", userSchema);
export default User;
