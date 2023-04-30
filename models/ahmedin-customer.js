/*
============================================
; Title:  ahmedin-customer.js
; Author: Professor Krasso
; Date:   27 Apirl 2023
; Modified By: Yakut Ahmedin
; Description: Customers's API
;===========================================
*/
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const lineItemSchema = Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const invoice = Schema({
  subtotal: Number,
  tax: Number,
  dateCreated: String,
  dateShipped: String,
  linerItems: [lineItemSchema],
});

const customerSchema = Schema({
  firstName: String,
  lastName: String,
  userName: String,
  invoices: [invoice],
});

const Customer = mongoose.model("Cusotmer", customerSchema);
export default Customer;
