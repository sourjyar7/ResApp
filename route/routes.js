const express = require("express")
const mongoose = require("mongoose")
const md5 = require("md5")
const mongoDB = 'mongodb://127.0.0.1/resdb';
const user = require('../schemas/user')
const query = require('../schemas/queries')
mongoose.connect(mongoDB,{useNewUrlParser : true})
.then(()=>
{
    console.log("DB Connected Succesfully");
})
.catch((err)=>
{
    console.log("Error In Connection");
});
console.log("Object Model Loaded");
const router = express.Router();

//login system
router.get('/login',(req,res)=>{
    console.log(req.query);
    var name = req.query.name;
    var pass = md5(req.query.password)
    var role = req.query.role;
    user.countDocuments({uname : name,password : pass,role : role},(err,count)=>{
        if(count == 0)
            res.send("User or Password Error");
        else if(count == 1)
            res.send("Login Successful");
        else    
            res.send(err);
    })
});

//registration system
router.get('/register',(req,res)=>{
    console.log(req.query);
    var pass = md5(req.query.password)
    var newUser = new user(req.query);
    console.log(newUser);
    newUser.save((err,user)=>{
        if(err)
            res.send(err)
        else
            res.send(req.query.uname + ", You have been registered Successfully");
    })
})

//query entering system
router.get('/qreg',(req,res)=>{
    console.log(req.query)
    var newQuery = new query(req.query);
    console.log(newQuery);
    newQuery.save((err,user)=>{
        if(err)
            res.send(err)
        else
            res.send(req.query.qcreator + "Your query has been submitted succesfully")
    })
})

//query view system 
router.get('/qview',(req,res)=>{
    query.find(req.query,(list,err)=>{
            if(err)
                res.send(err)
            else
                res.send(list)
    })
})

//search api

module.exports = router