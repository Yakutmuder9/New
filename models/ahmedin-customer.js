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

const lineItemSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number
});

const invoiceSchema = new Schema({
  subtotal: Number,
  tax: Number,
  dateCreated: String,
  dateShipped: String,
  lineItems: [lineItemSchema]
});

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  invoices: [invoiceSchema]
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
