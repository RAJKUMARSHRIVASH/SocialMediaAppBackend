const express = require("express")
const mongoose = require("mongoose")
const postRouter = express.Router();
const {PostModel} = require("../model/postModel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

postRouter.use(express.json());

postRouter.get("/",async(req,res)=>{
    const {email} = req.body;
    try {
        const data = await PostModel.find({email})
        res.json(data);
    } catch (error) {
        res.json({"err" : error});
        console.log("err"+error);
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    try {
        const post = new PostModel(payload);
        await post.save();
        res.json("Post created");
    } catch (error) {
        res.json({"err" : error});
        console.log("err"+error);
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const id = req.params.id;
    const payload = req.body;
    const post = await PostModel.find({_id:id});
    const PostuserID = post.userID;
    const requserID = req.body.userID;

    try {
        if(PostuserID !== requserID) {
            res.json("you are not authorized");

        }   else {
            await PostModel.findByIdAndUpdate({_id:id},payload);
            res.json("Updated the post successfully");
        } 
    } catch (error) {
        res.json({"err" : error});
        console.log("err"+error);
    }
})
postRouter.patch("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const post = await PostModel.find({_id:id});
    const PostuserID = post.userID;
    const requserID = req.body.userID;

    try {
        if(PostuserID !== requserID) {
            res.json("you are not authorized");

        }   else {
            await PostModel.findByIdAndDelete({_id:id});
            res.json("Updated the post successfully");
        } 
    } catch (error) {
        res.json({"err" : error});
        console.log("err"+error);
    }
})


module.exports = {
    postRouter
}