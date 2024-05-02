import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Assets = () => {

    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      axios
        .get("http://localhost:3000/auth/asset")
        .then((result) => {
          if (result.data.Status) {
            setEmployee(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
  
    const handleDelete =(id) => {
     axios.delete('http://localhost:3000/auth/delete_employee/'+id)
     .then(result => {
      if(result.data.Status){
    window.location.reload()
      } else{
        alert(result.data.Error)
      }
     })
    }
  return (
    <div className="px-5 mt-3 ">
    <div className="d-flex justify-content-center">
      <h3> Asset List</h3>
    </div>

    <Link to="/dashboard/add-assets" className="btn btn-success">
      Add Asset
    </Link>
    <div className="mt-3">
      <table className="table table-striped">
        <thead className='thead-dark'>
          <tr>
            <th> Asset Name</th>
            <th>Procurement Date</th>
            <th> Warranty End Date</th>
            <th> Asset Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employee.map((e) => (
            <tr>
              
              <td>{e.Asset_Name}</td>
              <td>{e.Procurement_Date}</td>
              <td>{e.Asset_Warranty_Date}</td>
              <td>{e.Value}</td>

              <td>
                <Link
                  to={`/dashboard/edit_employee/` + e.id}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-info btn-sm me-2"
                  
                >
                  View
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Assets