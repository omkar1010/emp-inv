import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ? ";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginSatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginSatus: true });

    } else{
        return res.json({ loginSatus: false, Error: "Wrong email or password" });
    }
  });
});


router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category "
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status:true, Result:result})
    })
})

router.post('/add_category', (req, res)=>{
    const  sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status:true})
    })
})




router.post('/add_employee', (req, res) =>{
  const  sql = `INSERT INTO employee  
  (name,email,password, address, salary,image,category_id) 
    VALUES (?)`;

    bcrypt.hash(req.body.password , 10 , (err, hash )=>{
      if(err) return res.json({Status: false, Error: "Query Error"})
        const values  = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.body.image,
            req.body.category_id,

        ]

        con.query(sql , [values], (err , result) => {
          if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status:true, Result:result})
        } )
    })

})

export { router as adminRouter };
