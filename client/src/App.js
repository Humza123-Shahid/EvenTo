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
import AdminInventory from './AdminPages/AdminInventory';
import InventoryState from './context/InventoryState';
import AddInventory from './AdminPages/AddInventory';
import ViewInventory from './AdminPages/ViewInventory';
import EditInventory from './AdminPages/EditInventory';
import AdminMenu from './AdminPages/AdminMenu';
import AddMenu from './AdminPages/AddMenu';
import MenuState from './context/MenuState';
import ViewMenu from './AdminPages/ViewMenu';
import EditMenu from './AdminPages/EditMenu';
import AdminPackage from './AdminPages/AdminPackage';
import AddPackage from './AdminPages/AddPackage';
import PackageState from './context/PackageState';
import ViewPackage from './AdminPages/ViewPackage';
import EditPackage from './AdminPages/EditPackage';
import VenueState from './context/VenueState';
import AdminVenue from './AdminPages/AdminVenue';
import AddVenue from './AdminPages/AddVenue';
import ViewVenue from './AdminPages/ViewVenue';
import EditVenue from './AdminPages/EditVenue';
import AdminEvent from './AdminPages/AdminEvent';
import AddEvent from './AdminPages/AddEvent';
import ViewEvent from './AdminPages/ViewEvent';
import EditEvent from './AdminPages/EditEvent';


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
      <InventoryState>
      <MenuState>
      <PackageState>
      <VenueState>
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
              <Route path="event" element={<AdminEvent/>} />
              <Route path="event/addevent" element={<AddEvent/>} />
              <Route path="event/getevent" element={<ViewEvent/>} /> 
              <Route path="event/editevent" element={<EditEvent/>} />
              <Route path="inventory" element={<AdminInventory/>} />
              <Route path="inventory/addinventory" element={<AddInventory/>} />
              <Route path="inventory/getinventory" element={<ViewInventory/>} /> 
              <Route path="inventory/editinventory" element={<EditInventory/>} />
              <Route path="menu" element={<AdminMenu/>} />
              <Route path="menu/addmenu" element={<AddMenu/>} />
              <Route path="menu/getmenu" element={<ViewMenu/>} /> 
              <Route path="menu/editmenu" element={<EditMenu/>} />
              <Route path="package" element={<AdminPackage/>} />
              <Route path="package/addpackage" element={<AddPackage/>} />
              <Route path="package/getpackage" element={<ViewPackage/>} /> 
              <Route path="package/editpackage" element={<EditPackage/>} />
              <Route path="venue" element={<AdminVenue/>} />
              <Route path="venue/addvenue" element={<AddVenue/>} />
              <Route path="venue/getvenue" element={<ViewVenue/>} /> 
              <Route path="venue/editvenue" element={<EditVenue/>} />
          </Route>
          
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
            
          </Routes>
        </div>
        </UserState>
        </EventState>
        </VenueState>
        </PackageState>
        </MenuState>
        </InventoryState>
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

