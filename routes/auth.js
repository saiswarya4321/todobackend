const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/User");
require("dotenv").config();

const router=express.Router();

router.post("/register", async (req,res)=>{
const {username,password}=req.body;
try {
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser= new User({username,password:hashedPassword});
    await newUser.save();
    res.status(201).json({message:"user registered successfully"});

} catch (error) {
    res.status(500).json({error:"registering user"});
}
});

router.post("/login",async (req,res)=>{
    const {username,password}=req.body;

try {
    const user=await User.findOne({username});
    if(!user) return res.status(400).json({error:"Invalid credentials"});

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch ) return res.status(400).json({error : "Invalid credentials"});

    const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET);
    res.json({success: true,token,user});



} catch (error) {
    res.status(500).json({error :"Error logging in"})
}
})
module.exports=router;