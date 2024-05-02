import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    // name: "",
    // email: "",
    // password: "",
    // address: "",
    // salary: "",
    // category_id: "",
    // image: "",

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


  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate each field and set errors if any
    // Example validation (you can customize as per your requirements)
    if (!employee.First_Name.trim()) {
      errors.First_Name = "First name is required";
      isValid = false;
    }
    if (!employee.Last_Name.trim()) {
      errors.Last_Name = "Last name is required";
      isValid = false;
    }

    // Validation logic for Contact Number
if (!employee.Emp_Contact.trim()) {
  errors.Emp_Contact = "Contact number is required";
  isValid = false;
} else if (!/^\d{10}$/.test(employee.Emp_Contact)) {
  errors.Emp_Contact = "Please enter a valid 10-digit phone number";
  isValid = false;
}

// Validation logic for Email
if (!employee.email.trim()) {
  errors.email = "Email address is required";
  isValid = false;
} else if (!/\S+@\S+\.\S+/.test(employee.email)) {
  errors.email = "Please enter a valid email address";
  isValid = false;
}

// Validation logic for Password
if (!employee.password.trim()) {
  errors.password = "Password is required";
  isValid = false;
} else if (employee.password.length < 8) {
  errors.password = "Password must be at least 8 characters long";
  isValid = false;
}

// Validation logic for Address Line 1
if (!employee.Emp_Address1.trim()) {
  errors.Emp_Address1 = "Address Line 1 is required";
  isValid = false;
}


// Validation logic for Address Line 2
if (!employee.Emp_Address2.trim()) {
  errors.Emp_Address2 = "Address Line 2 is required";
  isValid = false;
}


// Validation logic for City
if (!employee.City.trim()) {
  errors.City = "City name is required";
  isValid = false;
}

// Validation logic for State
if (!employee.State.trim()) {
  errors.State = "State name is required";
  isValid = false;
}

// Validation logic for Postal Code
if (!employee.PinCode.trim()) {
  errors.PinCode = "Postal code is required";
  isValid = false;
} 

if (!employee.Emp_Dept) {
  errors.Emp_Dept = "Department selection is required";
  isValid = false;
}



// Validation logic for Date of Birth
if (!employee.Date_of_Birth.trim()) {
  errors.Date_of_Birth = "Date of birth is required";
  isValid = false;
} else {
  const dob = new Date(employee.Date_of_Birth);
  const currentDate = new Date();
  if (dob >= currentDate) {
    errors.Date_of_Birth = "Date of birth must be in the past";
    isValid = false;
  }
}

// Validation logic for Emergency Contact Name
if (!employee.Emergency_Name.trim()) {
  errors.Emergency_Name = "Emergency contact name is required";
  isValid = false;
}

// Validation logic for Emergency Contact Number
if (!employee.Emergency_Contact.trim()) {
  errors.Emergency_Contact = "Emergency contact number is required";
  isValid = false;
} else if (!/^\d{10}$/.test(employee.Emergency_Contact.trim())) {
  errors.Emergency_Contact = "Invalid emergency contact number format";
  isValid = false;
}
if (!employee.image) {
  errors.image = "Image is required";
  isValid = false;
}



    // Perform similar validation for other fields

    setErrors(errors); // Set the validation errors
    return isValid;
  };



  

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  

const handleSubmit = (e) => {

  e.preventDefault()

  const formattedDateOfBirth = formatDate(employee.Date_of_Birth);

  if(validateForm())  {
    
  

  const formData = new FormData();
  formData.append('First_Name', employee.First_Name);
  formData.append('Last_Name', employee.Last_Name);
  formData.append('Emp_Contact', employee.Emp_Contact);
  formData.append('Emp_Address1', employee.Emp_Address1);
  formData.append('Emp_Address2', employee.Emp_Address2);
  formData.append('City', employee.City);
  formData.append('State', employee.State);
  formData.append('PinCode', employee.PinCode);
  formData.append('Date_of_Birth', formattedDateOfBirth);
  console.log(formattedDateOfBirth)
  formData.append('Emergency_Name', employee.Emergency_Name);
  formData.append('Emergency_Contact', employee.Emergency_Contact);


  formData.append('email', employee.email);
  formData.append('password', employee.password);
  formData.append('image', employee.image);
  formData.append('Emp_Dept', employee.Emp_Dept);



  



  axios.post('http://localhost:3000/auth/add_employee', formData)
  .then(result => {
    if (result.data.Status) {
      navigate("/dashboard/employee");
    } else {
      alert(result.data.Error);
    }
  })
  .catch(err => console.log(err))
}

}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fileType = file.type;
    if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
      setErrors({ ...errors, image: 'Please select a PNG or JPG image' });
    } else {
      setEmployee({ ...employee, image: file });
      setErrors({ ...errors, image: '' }); // Clear any previous error
    }
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 ">
      <div className="p-3 rounded w-50 border ">
        <h3>Add Employee </h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
            First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, First_Name: e.target.value })
              }
            />
              {errors.First_Name && (
            <div className="text-danger">{errors.First_Name}</div>
          )}
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
             Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name "
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, Last_Name: e.target.value })
              }
            />
            {errors.Last_Name && (
    <div className="text-danger">{errors.Last_Name}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
            Contact Number
            </label>
            <input
              type="tel"
              placeholder="Enter contact number"
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, Emp_Contact: e.target.value })
              }
            />
             {errors.Emp_Contact && (
    <div className="text-danger">{errors.Emp_Contact}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address "
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />

{errors.email && (
    <div className="text-danger">{errors.email}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputPassword4" className="form-label">
            Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control rounded-0"
              id="inputPassword4"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />

{errors.password && (
    <div className="text-danger">{errors.password}</div>
  )}
          </div>

          

          <div className="col-12">
            <label for="inputAddress" className="form-label">
            Address Line 1
            </label>
            <input
              type="text"
              placeholder="Enter address line 1"
              className="form-control rounded-0"
              id="inputAddress"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, Emp_Address1: e.target.value })
              }
            />

{errors.Emp_Address1 && (
    <div className="text-danger">{errors.Emp_Address1}</div>
  )}
          </div>

          
          <div className="col-12">
            <label for="inputAddress" className="form-label">
            Address Line 2
            </label>
            <input
              type="text"
              placeholder="Enter address line 2"
              className="form-control rounded-0"
              id="inputAddress"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, Emp_Address2: e.target.value })
              }
            />

{errors.Emp_Address2 && (
    <div className="text-danger">{errors.Emp_Address2}</div>
  )}
          </div>


 <div className="col-12">
            <label for="inputName" className="form-label">
             City
            </label>
            <input
              type="text"
              placeholder="Enter city name "
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, City: e.target.value })
              }
            />

{errors.City && (
    <div className="text-danger">{errors.City}</div>
  )}
          </div>


          <div className="col-12">
            <label for="inputName" className="form-label">
            State
            </label>
            <input
              type="text"
              placeholder="Enter state name "
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, State: e.target.value })
              }
            />

{errors.State && (
    <div className="text-danger">{errors.State}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
            Postal Code
            </label>
            <input
              type="text"
              placeholder="Enter postal code "
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, PinCode: e.target.value })
              }
            />

{errors.PinCode && (
    <div className="text-danger">{errors.PinCode}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
            Date of Birth
            </label>
            <input
              type="date"
              placeholder="Enter date of birth "
              className="form-control rounded-0"
              id="inputName"
              // onChange={(e) =>
                
              //   setEmployee({ ...employee, Date_of_Birth: e.target.value })
              // }
              onChange={(e) =>
                setEmployee({ ...employee, Date_of_Birth: e.target.value })
              }
            />

{errors.Date_of_Birth && (
    <div className="text-danger">{errors.Date_of_Birth}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
            Emergency Contact Name
            </label>
            <input
              type="text"
              placeholder="Enter emergency contact name "
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, Emergency_Name: e.target.value })
              }
            />
            {errors.Emergency_Name && (
    <div className="text-danger">{errors.Emergency_Name}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputName" className="form-label">
            Emergency Contact Number
            </label>
            <input
              type="tel"
              placeholder="Enter emergency contact number"
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, Emergency_Contact: e.target.value })
              }
            />
             {errors.Emergency_Contact && (
    <div className="text-danger">{errors.Emergency_Contact}</div>
  )}
          </div>

          <div className="col-12">
            <label for="category" className="form-label">
            Department
            </label>
            <select name="category" id="category" className="form-select"
            onChange={(e) =>setEmployee({...employee, Emp_Dept:e.target.value})}
            >
              
              {category.map((c) => {
                console.log(category)
                return <option value={c.id}> {c.name}</option>;
              })}
            </select>
            {errors.Emp_Dept && (
    <div className="text-danger">{errors.Emp_Dept}</div>
  )}
          </div>

          <div className="col-12">
            <label for="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              accept=".png, .jpg, .jpeg" // Accept only PNG and JPG files
            // onChange={(e) =>setEmployee({...employee, image: e.target.files[0]})}
            onChange={(e) => {
              setEmployee({ ...employee, image: e.target.files[0] });
              handleImageChange(e); // Call the image validation function
            }}

            />

{errors.image && (
    <div className="text-danger">{errors.image}</div>
  )}
          </div>

          <button className="btn btn-success w-100 rounded-0 mb-2 ">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
