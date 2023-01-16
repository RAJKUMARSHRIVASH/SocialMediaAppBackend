const express = require("express")
const mongoose = require("mongoose")
const userRouter = express.Router();
const {UserModel} = require("../model/usermodel");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

userRouter.use(express.json());

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body;

    try {
        const data = await UserModel.findOne({email});
        if(data) {
            res.json("User already registered Please login");
        }else {
            bcrypt.hash(password,5,async(err,encrypted)=>{
                if(err){
                    res.json({"err": err});
                    console.log("bcrypt err");
                }else if(encrypted) {
                    console.log(encrypted);
                    const newuser = new UserModel({name,email,gender,password :encrypted})
                    await newuser.save();
                    res.send("registered successfully");
                    console.log('registered');
                }
            })
        }
    } catch (error) {
        console.log('Not able to register something went wrong'+ error);
        res.json({"err" : error});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try {
        const isRegistered = await UserModel.findOne({email});
        if(isRegistered) {
            bcrypt.compare(password,isRegistered.password,(err,result)=>{
                if(err){
                    res.json("wrong password");
                    console.log('wrong password');
                }else if(result) {
                    const token = jwt.sign({userID : isRegistered._id,name : isRegistered.name},"masai",{expiresIn:'1h'});
                    res.json({"msg" : "Login successfull", "token" : token})
                }else {
                    res.json("wrong password");
                    console.log('wrong password');
                }
            })
        }else{
            res.json("You have not registered wrong email");
            console.log('You have not registered');
        }
        
    } catch (error) {
        console.log('Wrong credentials'+ error);
        res.json({"err" : error});
    }
})


module.exports  = {
    userRouter
}