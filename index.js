const express =require("express");
const bodyparser=require("body-parser");
const app=express();
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");


const PORT = process.env.PORT || 3030;
const MONGO_URI =process.env.MONGO_URI;
//db meet
mongoose.connect(MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log("met with mongo"))
.catch((Error)=>console.error("Error")
);
mongoose.Promise = global.Promise;

app.use("/api/posts/", require("./routes/api/posts"));

app.use(passport.initialize());
require("./middleware/passport")(passport)
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use("/api/users/",require("./routes/api/users"));


//get
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
}
//listen me
app.listen(PORT,()=>{
    console.log(`connected to express listen,${PORT}`);
});