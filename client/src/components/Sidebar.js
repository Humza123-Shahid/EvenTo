import React,{ useState, useEffect}from 'react';
import { Link, useNavigate } from "react-router-dom";


const Sidebar = () => {
   let navigate=useNavigate();
   const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("activeTab") || "Buses"
  );
   useEffect(() => {
    localStorage.setItem("activeTab", selectedTab);
  }, [selectedTab]);

   const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.setItem("reloaded", "false");
        setSelectedTab("login")
         navigate('/login')
        // Optionally, redirect to a login page or home page after logout
        // history.push('/login'); // If using useHistory hook
      };
      const SelectedTab = (abc) => {
        
        setSelectedTab(abc)
        // Optionally, redirect to a login page or home page after logout
        // history.push('/login'); // If using useHistory hook
      };
  return(
  <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px',backgroundColor: '#2c3e50',
        color: 'white',
        height: '100vh',
        position: 'sticky',
        top: 0,
        padding: '1rem',
        overflow: 'hidden',}}>
    <h4 className="mb-4">Admin Dashboard</h4>
    <ul className="nav flex-column">
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="user" onClick={()=>SelectedTab("user")}><i className="fas fa-user me-2"></i> User</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="assignment" onClick={()=>SelectedTab("assignment")}><i className="fas fa-tasks me-2"></i> Assignment</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="role" onClick={()=>SelectedTab("role")}><i className="fas fa-users me-2"></i> Role</Link>
      </li>
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="permission" onClick={()=>SelectedTab("permission")}><i className="fas fa-check-circle me-2"></i> Permission</Link>
      </li>
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="beverage" onClick={()=>SelectedTab("beverage")}><i className="fas fa-glass-martini-alt me-2"></i> Beverage</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="expence" onClick={()=>SelectedTab("expence")}><i className="fas fa-dollar-sign me-2"></i> Expence</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="dish" onClick={()=>SelectedTab("dish")}><i className="fas fa-bowl-food me-2"></i> Dish</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="event" onClick={()=>SelectedTab("event")}><i className="fas fa-calendar-alt me-2"></i> Event</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="inventory" onClick={()=>SelectedTab("inventory")}><i className="fas fa-box me-2"></i> Inventory</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="menu" onClick={()=>SelectedTab("menu")}><i className="fas fa-utensils me-2"></i> Menu</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="package" onClick={()=>SelectedTab("package")}><i className="fas fa-gift me-2"></i> Package</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="venue" onClick={()=>SelectedTab("venue")}><i className="fas fa-building me-2"></i> Venue</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="login" onClick={handleLogout}><i className="fas fa-sign-out me-2"></i>Logout</Link>
      </li>
    </ul>
  </div>
  );
};

export default Sidebar;