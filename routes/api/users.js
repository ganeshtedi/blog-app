const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET; 
const validateSignUpInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");


//SIGNUP KI 

//FIRESTLY VALIDATE USER INPUT
router.post("/signup",(req,res)=>{
    const {errors,isValid}=validateSignUpInput(req.body);
    if(!isValid){
        return res.status(400);
    }
    //valid aythe
    const {user_name,email,password}=req.body;
    User.findOne({$or:[{email},{user_name}]})
    .then(user=>{
        if(user){
            if(user.email===email)
                return res.status(400).json({email:"email already exists"});
            else
                return res.status(400).json({user_name:"user name already exists"});
        }
        else{
            const nuser = new User({user_name,email,password});
            nuser.save().then(doc => res.json(doc)).catch(err => Console.log({create : "error creating user"}));
        }
        });
});



//router to login 
router.post("/login",(req,res)=>{
    const {errors,isValid}=validateLoginInput(req.body);
    if(!isValid){
        return res.status(400);
    }
    //valid aythe
    const {email,password}=req.body;
    User.findOne({email})
    .then(user=>{
        if(!user){
                return res.status(400).json({email:"email not found pls signup"});
            }
        else{
            if(user.password===password && user.email === email){
                const payload = {
                    id:user.id,
                    user_name:user.user_name
                };
                jwt.sign(payload,SECRET,{
                    expiresIn: 3600},(err,token) =>{
                        if(err){
                            console.log(err);
                        }
                        return res.json({
                            success:true,
                            token:"Bearer "+ token
                        });
                });
            }
            else{
                return res.status(400).json({ password: "Password Incorrect" });
            }
        }
    });
});

module.exports =router;
