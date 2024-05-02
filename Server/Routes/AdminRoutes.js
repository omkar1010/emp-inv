import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from  'multer';
import path from "path";

const router = express.Router();

// router.post("/adminlogin", (req, res) => {
//   const sql = "SELECT * from admin Where email = ? and password = ? ";
//   con.query(sql, [req.body.email, req.body.password], (err, result) => {
//     if (err) return res.json({ loginSatus: false, Error: "Query error" });
//     if (result.length > 0) {
//       const email = result[0].email;
//       const token = jwt.sign(
//         { role: "admin", email: email },
//         "jwt_secret_key",
//         { expiresIn: "1d" }
//       );
//       res.cookie('token', token)
//       return res.json({ loginSatus: true });

//     } else{
//         return res.json({ loginSatus: false, Error: "Wrong email or password" });
//     }
//   });
// });



// from chat gpt
router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ? ";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});



router.get('/category', (req, res) => {
    const sql = "SELECT * FROM department "
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: " department Query Error"})
        return res.json({Status:true, Result:result})
    })
})

router.post('/add_category', (req, res)=>{
    const  sql = "INSERT INTO department (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err,result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status:true})
    })
})

// image upload 
// const storage = multer.diskStorage({
//   destination: (req, file , cb )=>{
//     cb(null , 'Public/Images')
//   },
//   filename:(req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   storage: storage
// })




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});


// router.post('/add_employee',upload.single('image'), (req, res) =>{
//   const  sql = `INSERT INTO employee  
//   (name,email,password, address, salary,image,category_id) 
//     VALUES (?)`;

//     bcrypt.hash(req.body.password , 10 , (err, hash )=>{
//       if(err) return res.json({Status: false, Error: "Query Error"})
//         const values  = [
//             req.body.name,
//             req.body.email,
//             hash,
//             req.body.address,
//             req.body.salary,
//             req.file.filename,
//             req.body.category_id,

//         ]

//         con.query(sql , [values], (err , result) => {
//           if(err) return res.json({Status: false, Error: "Query Error"})
//         return res.json({Status:true, Result:result})
//         } )
//     })

// })


router.post('/add_employee', upload.single('image'), (req, res) => {
  const sql = `INSERT INTO employee (First_Name, Last_Name, Emp_Contact, PinCode, Emp_Address1, Emp_Address2, City,  State, email, password, image, Date_of_Birth, Emergency_Name, Emergency_Contact, Emp_Dept) VALUES (?)`;

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Status: false, Error: " add employee Query Error" });
 

     // Convert Date_of_Birth to 'YYYY-MM-DD' format
     const dateParts = req.body.Date_of_Birth.split('-'); // Split the date string by "-"
     const formattedDateOfBirth = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;// Rearrange the parts to 'YYYY-MM-DD'


    const values = [
      req.body.First_Name,
      req.body.Last_Name,
      req.body.Emp_Contact,
      
      req.body.PinCode,
      req.body.Emp_Address1,
      req.body.Emp_Address2,
      req.body.City,
      req.body.State,
     
      req.body.email,
      hash,
      req.file.filename, // Accessing the uploaded filename from req.file
      req.body.Date_of_Birth,// Use formatted date
      req.body.Emergency_Name,
      req.body.Emergency_Contact,
      req.body.Emp_Dept
    ];

    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });
});


router.get('/employee', (req, res) => {
  const sql = "SELECT * FROM employee "
  con.query(sql, (err, result) =>{
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status:true, Result:result})
  })
})


router.get('/employee/:id' , (req , res)=>{
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ? "
  con.query(sql, [id], (err, result) =>{
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status:true, Result:result})
  })
})


// router.put('/edit_employee/:id',(req, res) => {
//   const id = req.params.id;
//   const sql = `UPDATE employee
//    set  First_Name= ? , Last_Name= ? , email= ? , Emp_Dept= ?, Emp_Contact, PinCode , Emp_Address1 , Emp_Address2 , City , State , Date_of_Birth , Emergency_Name , Emergency_Contact , Emp_Dept
//   WHERE id = ? ` 
//   // First_Name= ? , Last_Name= ? , Emp_Contact= ? , PinCode= ? , Emp_Address1= ? , Emp_Address2= ? , City= ? , State= ? , email= ? , Date_of_Birth= ? ,  Emergency_Name= ? , Emergency_Contac= ? , Emp_Dept= ?
//   // name= ?, email= ? , salary = ? , address = ? , category_id = ? 
//   const values  = [
//     // req.body.name,
//     // req.body.email,
//     // req.body.salary,
//     // req.body.address,
//     // req.body.category_id,


//     req.body.First_Name,
//     req.body.Last_Name,
//     req.body.email,
//     req.body.Emp_Dept,
//     req.body.Emp_Contact,
    
//     req.body.PinCode,
//     req.body.Emp_Address1,
//     req.body.Emp_Address2,
//     req.body.City,
//     req.body.State,
   
   
  
   
//     req.body.Date_of_Birth,// Use formatted date
//     req.body.Emergency_Name,
//     req.body.Emergency_Contact,
//     req.body.Emp_Dept

// ];

// console.log("SQL Query:", sql);
//   console.log("Values:", values);

//   con.query(sql, [...values, id], (err, result) =>{
//     if(err) return res.json({Status: false, Error: "Query Error", err})
//     return res.status(200).json({ Status: true, Result: result }); // Use appropriate status codes
// })
// })


router.put('/edit_employee/:id',(req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee
   set First_Name= ?, Last_Name= ? , email = ? , Emp_Dept = ? , Emp_Contact = ? , City = ?
  WHERE id = ? ` 
  const values  = [
    req.body.First_Name,
    req.body.Last_Name,
    req.body.email,
    req.body.Emp_Dept,
    req.body.Emp_Contact,
    req.body.City
   
]
  con.query(sql, [...values, id], (err, result) =>{
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status:true, Result:result})
})
})


router.delete('/delete_employee/:id' , (req,res)=>{
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  con.query(sql, [ id], (err, result) =>{
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status:true, Result:result})

})
})


router.get('/admin_count', (req, res) => {
  const sql = "select count(id) as admin from admin";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/employee_count', (req, res) => {
  const sql = "select count(id) as employee from employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/salary_count', (req, res) => {
  const sql = "select sum(salary) as salaryOFEmp from employee";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/admin_records', (req, res) => {
  const sql = "select * from admin"
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/logout', ( req, res) =>{
  res.clearCookie('token')
  return res.json({Status: true})
})


router.post('/add_asset_category', (req, res)=>{
  const  sql = "INSERT INTO asset_category (`name`) VALUES (?)"
  con.query(sql, [req.body.category], (err,result) =>{
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status:true})
  })
})

router.get('/asset_category', (req, res) => {
  const sql = "SELECT * FROM asset_category "
  con.query(sql, (err, result) =>{
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status:true, Result:result})
  })
})

// Main ===============================================
// router.post('/add_asset', (req, res) => {
//   const sql = `INSERT INTO assets (Asset_Name, Asset_Category, Procurement_Date, Asset_Warranty_Date, Value, Owner) VALUES (?)`;



//     const values = [
//       req.body.Asset_Name,
//       parseInt(req.body.Asset_Category),
//       req.body.Procurement_Date,
//       req.body.Asset_Warranty_Date,
//       req.body.Value,
//       parseInt(req.body.Owner)
//     ];

//     con.query(sql, [values], (err, result) => {
//       if (err) return res.json({ Status: false, Error: "Query Error" },err);
//       return res.json({ Status: true, Result: result }, err);
//     });
//   });



//Working
router.post('/add_asset', (req, res) => {
  const sql = `INSERT INTO assets (Asset_Name, Asset_Category, Procurement_Date, Asset_Warranty_Date, Value, Owner) VALUES (?)`;
  console.log("SQL Query:", sql); // Log the SQL query

  const values = [
    req.body.Asset_Name,
    parseInt(req.body.Asset_Category), // Parse Asset_Category as integer
    req.body.Procurement_Date,
    req.body.Asset_Warranty_Date,
    req.body.Value,
    parseInt(req.body.Owner) // Parse Owner as integer
  ];

  con.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result });
  });
});


// whatsApp
// router.post('/add_asset', (req, res) => {
//   // Parse Asset_Category and Owner as integers
//   const assetCategory = parseInt(req.body.Asset_Category);
//   const owner = parseInt(req.body.Owner);

//   // Check if both Asset_Category and Owner are valid integers
//   if (isNaN(assetCategory) || isNaN(owner)) {
//     return res.status(400).json({ Status: false, Error: "Invalid Asset_Category or Owner" });
//   }

//   const sql = `INSERT INTO assets (Asset_Name, Asset_Category, Procurement_Date, Asset_Warranty_Date, Value, Owner) VALUES (?, ?, ?, ?, ?, ?)`;
//   const values = [
//     req.body.Asset_Name,
//     assetCategory,
//     req.body.Procurement_Date,
//     req.body.Asset_Warranty_Date,
//     req.body.Value,
//     owner
//   ];

//   con.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Query Error:", err);
//       return res.status(500).json({ Status: false, Error: "Failed to add asset" });
//     }
//     return res.json({ Status: true, Result: result });
//   });
// });



  router.get('/asset', (req, res) => {
    const sql = "SELECT * FROM assets "
    con.query(sql, (err, result) =>{
      if (err) return res.status(500).json({ Status: false, Error: "Query Error" });
        return res.json({Status:true, Result:result})
    })
  })



// Asset_Name, Asset_Category, Procurement_Date, Asset_Warranty_Date, Value, Owner


// router.post('/add_asset', (req, res)=>{
//   const  sql = "INSERT INTO assets (Asset_Name , Asset_Category, Procurement_Date, Asset_Warranty_Date, Value, Owner) VALUES (?)"


//   const values = [
//     req.body.Asset_Name,
//     req.body.Asset_Category,
//     req.body.Procurement_Date,
//     req.body.Asset_Warranty_Date,
//     req.body.Value, 
//     req.body.Owner
//   ];

//   con.query(sql, [values], (err,result) =>{
//       if(err) return res.json({Status: false, Error: "Query Error"})
//       return res.json({Status:true ,  Result: result}, err)
//   })
// })


// router.post('/add_asset', (req, res) => {
//   const sql = "INSERT INTO assets (Asset_Name, Asset_Category, Procurement_Date, Asset_Warranty_Date, Value, Owner) VALUES (?, ?, ?, ?, ?, ?)";

//   const values = [
//     req.body.Asset_Name,
//     req.body.Asset_Category,
//     req.body.Procurement_Date,
//     req.body.Asset_Warranty_Date,
//     req.body.Value,
//     req.body.Owner
//   ];

//   // Ensure that Asset_Category and Owner are integers
//   const categoryId = parseInt(req.body.Asset_Category);
//   const ownerId = parseInt(req.body.Owner);

//   // Check if Asset_Category and Owner exist in their respective tables
//   const checkCategoryQuery = "SELECT id FROM asset_categories WHERE id = ?";
//   const checkOwnerQuery = "SELECT id FROM owners WHERE id = ?";

//   con.query(checkCategoryQuery, [categoryId], (err, categoryResult) => {
//     if (err || categoryResult.length === 0) {
//       return res.json({ Status: false, Error: "Invalid Asset Category" });
//     }

//     con.query(checkOwnerQuery, [ownerId], (err, ownerResult) => {
//       if (err || ownerResult.length === 0) {
//         return res.json({ Status: false, Error: "Invalid Asset Owner" });
//       }

//       // Both Asset_Category and Owner exist, proceed with the insertion
//       con.query(sql, values, (err, result) => {
//         if (err) {
//           return res.json({ Status: false, Error: "Query Error" });
//         }
//         return res.json({ Status: true, Result: result });
//       });
//     });
//   });
// });


// router.post('/add_asset', (req, res)=>{
//   const  sql = "INSERT INTO assets (`name`) VALUES (?)"
//   con.query(sql, [req.body.Asset_Name], (err,result) =>{
//       if(err) return res.json({Status: false, Error: "Query Error"})
//       return res.json({Status:true})
//   })
// })



// Delete Department 


router.delete('/delete_department/:id' , (req,res)=>{
  const id = req.params.id;
  const sql = "delete from department where id = ?"
  con.query(sql, [ id], (err, result) =>{
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status:true, Result:result})

})
})


router.delete('/delete_assetcategory/:id' , (req,res)=>{
  const id = req.params.id;
  const sql = "delete from asset_category where id = ?"
  con.query(sql, [ id], (err, result) =>{
    if(err) return res.json({Status: false, Error: "Query Error"})
    return res.json({Status:true, Result:result})

})
})


router.get('/assetcount', (req, res) => {
  const sql = "select count(id) as assets from assets";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})



export { router as adminRouter };
