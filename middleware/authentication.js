const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    console.log(token);
    if(token) {
        const decrypted = jwt.verify(token,"masai");
        if(decrypted) {
            req.body.name = decrypted.name;
            req.body.userID = decrypted.userID;

            next();

        }else {
            res.json("Please login first")
            console.log('Please login first');
        }
    }else {
        res.json("Please login first")
        console.log('Please login first');

    }
}

module.exports = {
    authenticate
}