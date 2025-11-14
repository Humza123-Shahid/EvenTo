import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useState,useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Admin from './AdminPages/Admin';
import AdminAssignment from './AdminPages/AdminAssignment';
import AssignmentState from './context/AssignmentState';
import AddAssignment from './AdminPages/AddAssignment';
import StaffState from './context/StaffState';
import RoleState from './context/RoleState';
import EventState from './context/EventState';
import ViewAssignment from './AdminPages/ViewAssignment';
import EditAssignment from './AdminPages/EditAssignment';
import AdminUser from './AdminPages/AdminUser';
import UserState from './context/UserState';
import AddUser from './AdminPages/AddUser';
import ViewUser from './AdminPages/ViewUser';
import EditUser from './AdminPages/EditUser';
import AdminRole from './AdminPages/AdminRole';
import ViewRole from './AdminPages/ViewRole';
import AddRole from './AdminPages/AddRole';
import EditRole from './AdminPages/EditRole';
import PermissionState from './context/PermissionState';
import AdminPermssion from './AdminPages/AdminPermission';
import AddPermission from './AdminPages/AddPermission';
import ViewPermission from './AdminPages/ViewPermission';
import EditPermission from './AdminPages/EditPermission';
import AdminBeverage from './AdminPages/AdminBeverage';
import BeverageState from './context/BeverageState';
import AddBeverage from './AdminPages/AddBeverage';
import ViewBeverage from './AdminPages/ViewBeverage';
import EditBeverage from './AdminPages/EditBeverage';
import ExpenceState from './context/ExpenceState';
import AdminExpence from './AdminPages/AdminExpence';
import AddExpence from './AdminPages/AddExpence';
import ViewExpence from './AdminPages/ViewExpence';
import EditExpence from './AdminPages/EditExpence';
import DishState from './context/DishState';
import AdminDish from './AdminPages/AdminDish';
import AddDish from './AdminPages/AddDish';
import ViewDish from './AdminPages/ViewDish';
import EditDish from './AdminPages/EditDish';


function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  const location = useLocation();
  const navigate= useNavigate();
  //code to redirect to home page on reload at any other page
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
      window.location.reload();
    }
  }, []);
  
  return (
    <>
      <AssignmentState>
      <StaffState>
      <RoleState>
      <PermissionState>
      <BeverageState>
      <ExpenceState>
      <DishState>
      <EventState>
      <UserState>
        <div className="container"  style={{ maxWidth: "100vw",paddingLeft:"0px",paddingRight:"0px" }}>
          <Routes>
          <Route exact path="/admin" element={<Admin/>} >
              <Route path="assignment" element={<AdminAssignment/>} /> 
              <Route path="assignment/addassignment" element={<AddAssignment/>} /> 
              <Route path="assignment/getassignment" element={<ViewAssignment/>} />  
              <Route path="assignment/editassignment" element={<EditAssignment/>} />
              <Route path="user" element={<AdminUser/>} />  
              <Route path="user/adduser" element={<AddUser/>} />
              <Route path="user/getuser" element={<ViewUser/>} />  
              <Route path="user/edituser" element={<EditUser/>} />
              <Route path="role" element={<AdminRole/>} /> 
              <Route path="role/addrole" element={<AddRole/>} />
              <Route path="role/getrole" element={<ViewRole/>} /> 
              <Route path="role/editrole" element={<EditRole/>} />
              <Route path="permission" element={<AdminPermssion/>} /> 
              <Route path="permission/addpermission" element={<AddPermission/>} />
              <Route path="permission/getpermission" element={<ViewPermission/>} /> 
              <Route path="permission/editpermission" element={<EditPermission/>} />
              <Route path="beverage" element={<AdminBeverage/>} />
              <Route path="beverage/addbeverage" element={<AddBeverage/>} />
              <Route path="beverage/getbeverage" element={<ViewBeverage/>} /> 
              <Route path="beverage/editbeverage" element={<EditBeverage/>} />
              <Route path="expence" element={<AdminExpence/>} />
              <Route path="expence/addexpence" element={<AddExpence/>} />
              <Route path="expence/getexpence" element={<ViewExpence/>} /> 
              <Route path="expence/editexpence" element={<EditExpence/>} />
              <Route path="dish" element={<AdminDish/>} />
              <Route path="dish/adddish" element={<AddDish/>} />
              <Route path="dish/getdish" element={<ViewDish/>} /> 
              <Route path="dish/editdish" element={<EditDish/>} />

          </Route>
          
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
            
          </Routes>
        </div>
        </UserState>
        </EventState>
        </DishState>
        </ExpenceState>
        </BeverageState>
        </PermissionState>
        </RoleState>
        </StaffState>
        </AssignmentState>
        
    </>
  );
}

export default App;

