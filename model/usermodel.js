const express = require("express")
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    password : String
});

const UserModel = mongoose.model("socialMediaUser",userSchema);


module.exports = {
    UserModel
}