const express = require('express')
const router = express.Router()
const {con} = require('../db')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const secret = "Sign for signing auth-token"

// Route 1: for singing in
router.post("/signin",(req,res)=>{
    let obj = req.body;
   
    let sql = "SELECT * FROM `user` WHERE `email` = '"+obj.email+"'"
    con.query(sql,async(err,result)=>{
        if(err)
            res.send("There occurred an error finding your data")
        if(result.length == 1)
        {
            let match =await bcryptjs.compare(req.body.password,result[0].password)
            if(match){
                const authToken = jwt.sign({"uid":result[0].uid},secret)
                res.status(200).json({authToken})
            }
            else{
                res.send("Incorrect credential")
            }
                
            }
        else{
            res.send("Incorrect Credential")
        }
    })
})

// Route 2 for singing up: for singing in
router.post("/signup", async (req,res)=>{
    let obj = req.body
    const salt = await bcryptjs.genSalt(10);
    let pass = await bcryptjs.hash(req.body.password,salt);
    let sql = "INSERT INTO `user` (`name`, `email`, `password`, `date`) VALUES ('"+obj.name+"', '"+obj.email+"', '"+pass+"', current_timestamp());"
    con.query(sql,(err)=>{
        if(err)
            res.status(500).send("There is an error inserting your data in database")
    })
    sql = "select `uid` from user where email='"+req.body.email+"'" 
    con.query(sql,(err,result)=>{
        if (err) {
            res.status(500).send("Internal server error")
        }
        else{
            const authToken = jwt.sign({"uid":result[0].uid},secret)
            res.status(200).json({authToken})
        }
    })
})

// // Route 3: for singing in using auth-token user should be logged in ie login required
router.get("/getuser",(req,res)=>{
    let token=req.header('auth-token');
    if(!token){
        res.send("Please try with correct auth token")
    }
    let data = jwt.verify(token,secret)

    let sql = "select name,email,date from user where uid='"+data.uid+"'";
    con.query(sql,(err,result)=>{
        if (err) {
            res.send(err)
        }
        else{
            res.status(200).send(result)
        }
    })

})

module.exports = router