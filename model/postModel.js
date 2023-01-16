const express = require("express")
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    name : String,
    userID : String
});

const PostModel = mongoose.model("socialMediaPost",postSchema);


module.exports = {
    PostModel
}