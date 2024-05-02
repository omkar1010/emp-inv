import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'




const EditEmployee = () => {
    const {id} = useParams()
   const  navigate=useNavigate();
    const [employee, setEmployee] = useState({
      First_Name: "",
      Last_Name: "",
      Emp_Contact: "",
      Emp_Address1: "",
      Emp_Address2:"",
      City:"",
      State:"",
      PinCode:"",
      Date_of_Birth:"",
      Emergency_Name:"",
      Emergency_Contact:"",
      email:"",
      password:"",
      image:"",
      Emp_Dept:""
      
      });


    const [category, setCategory] = useState([])



      useEffect(()=>{
        axios.get('http://localhost:3000/auth/category')
        .then(result =>{
     if(result.data.Status) {
         setCategory(result.data.Result);
     } else {
       alert(result.data.Error)
     }
        }).catch(err =>{
         console.log(err)
        })

        axios.get('http://localhost:3000/auth/employee/'+id)
        .then(result =>{
  setEmployee({
    ...employee,
    // name: result.data.Result[0].name,
    // email: result.data.Result[0].email,
    // address: result.data.Result[0].address,
    // salary: result.data.Result[0].salary,
    // category_id: result.data.Result[0].category_id,

    First_Name: result.data.Result[0].First_Name,
    Last_Name: result.data.Result[0].Last_Name,
    Emp_Contact: result.data.Result[0].Emp_Contact,
    Emp_Address1: result.data.Result[0].Emp_Address1,
    Emp_Address2: result.data.Result[0].Emp_Address2,
    City: result.data.Result[0].City,
    State: result.data.Result[0].State,          
    PinCode: result.data.Result[0].PinCode,
    Date_of_Birth: result.data.Result[0].Date_of_Birth,
    Emergency_Name:result.data.Result[0].Emergency_Name,
    Emergency_Contact:result.data.Result[0].Emergency_Contact,
    email:result.data.Result[0].email,
    // password:result.data.Result[0].password,
    Emp_Dept:result.data.Result[0].Emp_Dept,


     
  })
        }) .catch(err => console.log(err))
         },[])
         console.log(employee)


         const handleSubmit = (e) => {
            e.preventDefault()
            axios.put('http://localhost:3000/auth/edit_employee/' +id, employee)
            .then(result => {
                if(result.data.Status){
                    navigate('/dashboard/employee')
                } else{
                    alert(result.data.Error)
                }
            }) .catch(err => console.log(err))
         }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 ">
    <div className="p-3 rounded w-50 border ">
      <h3>Edit Employee </h3>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label for="inputName" className="form-label">
             First Name
          </label>
          <input
            type="text"
            placeholder="Enter First Name "
            value={employee.First_Name}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee, First_Name: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
             Last Name
          </label>
          <input
            type="text"
            placeholder="Enter First Name "
            value={employee.Last_Name}
            className="form-control rounded-0"
            id="inputLast"
            onChange={(e) =>
              setEmployee({ ...employee, Last_Name: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email "
            value={employee.email}

            className="form-control rounded-0"
            id="inputEmail4"
            autoComplete="off"
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="category" className="form-label">
            Category
          </label>
          <select name="category" id="category" className="form-select"
          onChange={(e) =>setEmployee({...employee, Emp_Dept:e.target.value})}
          >
            {category.map((c) => {
              return <option value={c.id}> {c.name}</option>;
            })}
          </select>
        </div>
        <div className="col-12">
          <label for="inputName" className="form-label">
             Employee Conatct No
          </label>
          <input
            type="tel"
            placeholder="Enter Contact No"
            value={employee.Emp_Contact}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee, Emp_Contact: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
             Address 1
          </label>
          <input
            type="text"
            placeholder="Enter Your Address "
            value={employee.Emp_Address1}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee, Emp_Address1: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
             Address 2
          </label>
          <input
            type="text"
            placeholder="Enter Your Address "
            value={employee.Emp_Address2}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee, Emp_Address2: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
          City
          </label>
          <input
            type="text"
            placeholder="Enter Your City Name "
            value={employee.City}
            className="form-control rounded-0"
            id="City"
            onChange={(e) =>
              setEmployee({ ...employee, City: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
          State
          </label>
          <input
            type="text"
            placeholder="Enter Your City Name "
            value={employee.State}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee, State: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
          PinCode
          </label>
          <input
            type="text"
            placeholder="Enter Your Pin Code "
            value={employee.PinCode}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee, PinCode: e.target.value })
            }
          />
        </div>


        <div className="col-12">
          <label for="inputName" className="form-label">
          Date of Birth
          </label>
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            value={employee. Date_of_Birth}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee,  Date_of_Birth: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
             Emergency Contact Name
          </label>
          <input
            type="text"
            placeholder="Enter First Name "
            value={employee. Emergency_Name}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee,  Emergency_Name: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputName" className="form-label">
             Emergency Contact No
          </label>
          <input
            type="text"
            placeholder="Enter First Name "
            value={employee. Emergency_Contact}
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setEmployee({ ...employee,  Emergency_Contact: e.target.value })
            }
          />
        </div>

        

        

      

       

       

         {/* <div className="col-12">
          <label for="inputGroupFile01" className="form-label">
            Select Image
          </label>
          <input
            type="file"
            className="form-control rounded-0"
            id="inputGroupFile01"
            name="image"
          onChange={(e) =>setEmployee({...employee, image: e.target.files[0]})}

          />
        </div> */}

        <button className="btn btn-success w-100 rounded-0 mb-2 ">
          Edit Employee
        </button>
      </form>
    </div>
  </div>
  )
}

export default EditEmployee