const express = require('express')
const router = express.Router()
const {con} = require('../db')
const jwt = require("jsonwebtoken")
const secret = "Sign for signing auth-token"

router.post("/add",(req,res)=>{
    let uid = jwt.verify(req.header('auth-token'),secret).uid
    let sql = "INSERT INTO `notes`(`uid`,`title`, `description`, `tag`, `date`) VALUES ('"+uid+"','"+req.body.title+"','"+req.body.description+"','"+req.body.tag+"',current_timestamp())"
    con.query(sql,(err,result)=>{
        if(err)
            res.send("Error occurred")
        else{
            res.status(200).json(result)
        }
    })
})

router.post("/delete",(req,res)=>{
    let uid = jwt.verify(req.header('auth-token'),secret).uid
    let sql = "delete from `notes` where uid="+uid+" and nid='"+req.body.nid+"'"
    con.query(sql,(err,result)=>{
        if(err)
            res.send(err)
        else{
            res.send(result)
        }
    })

})

router.get("/read",(req,res)=>{
    let uid = jwt.verify(req.header('auth-token'),secret).uid
    let sql = "select * from notes where uid="+uid
    con.query(sql,(err,result)=>{
        if(err)
            res.send("Error occurred")
        else{
            res.status(200).json(result)
        }
    })
})

router.post("/update",(req,res)=>{
    let uid = jwt.verify(req.header('auth-token'),secret).uid
    let sql = "update notes set title='"+req.body.title+"' , description='"+req.body.description+"' ,tag='"+req.body.tag+"' where uid='"+uid+"' and nid='"+req.body.nid+"'"
    con.query(sql,(err)=>{
        if(err){
            return res.send("Updation failed")
        }
        res.send("success")
    })
})

module.exports = router