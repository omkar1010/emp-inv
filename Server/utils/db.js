import mysql from 'mysql'

const con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    port: 3307,
    password:"",
    database: "inventory"
})

con.connect(function(err){
    if(err){
        console.log("connection err")
        console.log(err)
    } else {
        console.log("connected")
    }
})


export default con; 
