import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);

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
  axios.post('http://localhost:3000/auth/add_employee', employee)
  .then(result => console.log(result.data))
  .catch(err => console.log(err))
}

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 ">
      <div className="p-3 rounded w-50 border ">
        <h3>Add Employee </h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name "
              className="form-control rounded-0"
              id="inputName"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
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
              className="form-control rounded-0"
              id="inputEmail4"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password "
              className="form-control rounded-0"
              id="inputPassword4"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputSalry" className="form-label">
              Salary
            </label>
            <input
              type="text"
              placeholder="Enter Salary "
              className="form-control rounded-0"
              id="inputSalary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control rounded-0"
              id="inputAddress"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
            onChange={(e) =>setEmployee({...employee, category_id:e.target.value})}
            >
              {category.map((c) => {
                return <option value={c.id}> {c.name}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <label for="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
            onChange={(e) =>setEmployee({...employee, image: e.target.files[0]})}

            />
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
