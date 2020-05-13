const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");
const validatePostInput = require("../../validation/post");

router.get('/',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Post.find({author:req.user.user_name})
    .then(posts=>res.status(200).json(posts))
    .catch(err=>res.status(400).json({user:"error login again"}));
});

router.get("/post/:id",(req,res)=>{
    Post.find({_id:req.param.id})
    .then(posts=>res.status(200).json({posts}))
    .catch(err=>res.status(400).json({user:"error in post get "}));
});

router.post("/postcreate",passport.authenticate("jwt", { session: false }),(req,res)=>{
    const author =req.user.user_name;
    const post =req.body;
    const {errors, isValid} =validatePostInput(post);
    if(!isValid){
        return res.status(400).json(errors);
    }
    post.author=author;
    const npost = new Post(post);
    npost.save()
    .then(doc=>res.json(doc))
    .catch(err=> console.log({postcreate:"error in creating post"}));
});

router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
       const author = req.user.user_name;
       Post.findOneAndDelete({ author, _id: req.params.id })
          .then(doc => res.status(200).json(doc))
          .catch(err =>
             res.status(400).json({ delete: "Error deleting a post" })
          );
    }
 );

 module.exports = router;