import { useEffect, useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import {BrowserRouter , Routes, Route, Navigate, useNavigate} from "react-router-dom"
import Dashboard from './Components/Dashboard';
import Home from "../src/Components/Home"
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetails from './Components/EmployeeDetails';
import axios from 'axios';
import PrivateRoute from './Components/PrivateRoute';
import Assets from './Components/Assets';
import AssetsCategory from './Components/AssetsCategory';
import AddAssets from './Components/AddAssets';
import AddAssetsCategory from './Components/AddAssetsCategory';
function App() {
  

  return (


    <>
   <BrowserRouter>
   <Routes>

<Route path='/' element={<Start />}></Route>
<Route path='/adminlogin' element={<Login/>}> </Route>
<Route path='/employee_login' element={<EmployeeLogin/>}> </Route>
<Route path='/employee_detail/:id' element={<EmployeeDetails/>}></Route>


<Route path='/dashboard' element={

  <PrivateRoute>

<Dashboard/>
  </PrivateRoute>

}> 
<Route path='' element={<Home/>}></Route>
<Route path='/dashboard/employee' element={<Employee/>}></Route>
<Route path='/dashboard/category' element={<Category/>}></Route>
<Route path='/dashboard/profile' element={<Profile/>}></Route>
<Route path='/dashboard/asset' element={<Assets/>}></Route>
<Route path='/dashboard/add-assets' element={<AddAssets/>}></Route>
<Route path='/dashboard/asset_category' element={<AssetsCategory/>}></Route>
<Route path='/dashboard/add-asset_category' element={<AddAssetsCategory/>}></Route>

<Route path='/dashboard/add_category' element={<AddCategory/>}></Route>
<Route path='/dashboard/add_employee' element={<AddEmployee/>}></Route>
<Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>



</Route>


  </Routes>
  
   </BrowserRouter>

    </>
  ) 
}

export default App
