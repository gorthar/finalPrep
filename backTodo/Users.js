const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  gender: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
// Path: index.js
// import cors from "cors";
// import express from "express";
// import mongoose from "mongoose";
// import User from "./Users.js";
//
