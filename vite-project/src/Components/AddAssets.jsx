import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AddAssets = () => {

    const [asset, setAsset] = useState({
        Asset_Name: "",
        Asset_Category: "",
        Procurement_Date: "",
        Asset_Warranty_Date: "",
        Value: "",
        Owner: ""
        
      });
      const [category, setCategory] = useState([]);
      const [owner, SetOwner] = useState([])
      const navigate = useNavigate()
    
      useEffect(() => {
        console.log(asset)
        axios
          .get("http://localhost:3000/auth/asset_category")
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


          axios
          .get("http://localhost:3000/auth/employee")
          .then((result) => {
            if (result.data.Status) {
                console.log(result.data.Result)
                SetOwner(result.data.Result);
                console.log(SetOwner)
            } else {
              alert(result.data.Error);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    
    
    const handleSubmit = (e) => {
    
        console.log("Asset Object:", asset);

      e.preventDefault()

      console.log("Asset_Category:", asset.Asset_Category);
    console.log("Owner:", asset.Owner);

  const formattedDateProcurement_Date = formatDate(asset.Procurement_Date);
  const formattedDateAsset_Warranty_Date = formatDate(asset.Asset_Warranty_Date);


//       const parsedAssetCategory = parseInt(asset.Asset_Category);
//   const parsedOwner = parseInt(asset.Owner);
    
      const formData = new FormData();
      formData.append('Asset_Name', asset.Asset_Name);
      formData.append('Asset_Category', asset.Asset_Category);
      formData.append('Procurement_Date', formattedDateProcurement_Date);
      console.log(formattedDateProcurement_Date)
      formData.append('Asset_Warranty_Date', formattedDateAsset_Warranty_Date);
      console.log(formattedDateAsset_Warranty_Date)
      formData.append('Value', asset.Value);
      formData.append('Owner', asset.Owner);
    
    
    
      
    
    
    
      axios.post('http://localhost:3000/auth/add_asset', formData)
      .then(result => {
        if (result.data.Status) {
            console.log(result.data.Result)
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err))
    }


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 ">
    <div className="p-3 rounded w-50 border ">
      <h3>Add Asset </h3>
      <form className="row g-1" onSubmit={handleSubmit}>
        <div className="col-12">
          <label for="inputName" className="form-label">
          Asset Name
          </label>
          <input
            type="text"
            placeholder="Enter asset name"
            className="form-control rounded-0"
            id="inputName"
            onChange={(e) =>
              setAsset({ ...asset, Asset_Name: e.target.value })
            }
          />
        </div>

       


        <div className="col-12">
          <label for="category" className="form-label">
          Asset Category
          </label>
          <select name="category" id="category" className="form-select"
          onChange={(e) =>setAsset({...asset, Asset_Category:e.target.value})}
          >
            
            {category.map((c) => {
                console.log(category)
              return <option value={c.id}> {c.name}</option>;
            })}
          </select>
        </div>

        <div className="col-12">
          <label for="inputPassword4" className="form-label">
          Procurement Date
          </label>
          <input
            type="date"
            className="form-control rounded-0"
            id="inputprocurement"
            onChange={(e) =>
              setAsset({ ...asset, Procurement_Date: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputSalry" className="form-label">
          Warranty End Date
          </label>
          <input
            type="date"
            placeholder="Enter Warranty End Date"
            className="form-control rounded-0"
            id="inputWarranty"
            autoComplete="off"
            onChange={(e) =>
              setAsset({ ...asset, Asset_Warranty_Date: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="inputAddress" className="form-label">
          Asset Value
          </label>
          <input
            type="text"
            placeholder="Enter asset value"
            className="form-control rounded-0"
            id="inputAddress"
            autoComplete="off"
            onChange={(e) =>
              setAsset({ ...asset, Value: e.target.value })
            }
          />
        </div>

        <div className="col-12">
          <label for="category" className="form-label">
          Asset Owner
          </label>
          <select name="owner" id="owner" className="form-select"
          onChange={(e) =>setAsset({...asset, Owner:e.target.value})}
          >
            
            {owner.map((c) => {
              return <option value={c.id}> {c.First_Name}</option>;
            })}
          </select>
        </div>

     

        <button className="btn btn-success w-100 rounded-0 mb-2 ">
          Add Asset
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddAssets