const express = require('express')
const {connection} = require('./db')
var cors = require('cors')
const app = express()
connection()

app.use(express.json())
app.use(cors())
app.use("/api/auth",require('./routes/auth'))
app.use("/api/notes",require('./routes/notes'))



// app.get('/', (req, res) => {
//     res.send('hello world')
//   })



app.listen(5000,()=>{
    console.log("Listening at port 5000")
})

