const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {connection} = require("./config/db");
const {userRouter} = require("./route/userRouter");
const {postRouter} = require("./route/postRouter");
const {authenticate} = require("./middleware/authentication");


require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
app.use("/users",userRouter);

app.use(authenticate)
app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to the DB");
    } catch (error) {
        console.log('Not able to connect'+ error);
    }
    console.log(`Server is running at port ${process.env.port}`);
})