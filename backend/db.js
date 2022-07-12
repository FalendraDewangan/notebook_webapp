const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"notebook"
  });

module.exports = {
    connection:()=>{
            con.connect((err) => {
                if (err)
                console.log(err)
                else{

                    console.log("Connected Successfully")
                }
        })
    },
    con:con
}