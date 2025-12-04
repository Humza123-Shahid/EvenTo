import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import userContext from '../context/userContext'
import roleContext from '../context/roleContext'
import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminUser = () => {
    const context=useContext(userContext);
    const {users,deleteUser,getUsers}=context;
    const context2=useContext(roleContext);
    const {roles,getRoles}=context2;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('adduser');

  };
  const handleSearchClick = () => {
        console.log("abc")

  };
  // useEffect(() => {
  //   const storedCount = localStorage.getItem("qcount");
  //   if (storedCount !== null) {
  //     setQcount(Number(storedCount));
  //   }
  // }, []);
  console.log(users)
  const filteredData = users.filter(item =>
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (Name,Email,Phone,roleName,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    //const datadriver=getDriverById(driverId);
    navigate('getuser', { state: { name:Name,email:Email,phone:Phone,role:roleName,idx:index+1} });
     
  };
  const handleEdit = async (id,Name,Email,Phone,Password,role_id) => {
    // const dataitem=buses.find(da => da._id ==id)
    // const datadriver=getDriverById(driverId);
    const role = getRoleById(role_id);
    console.log(id);
    if(role?.name=="director")
    {
      const response=await fetch("http://localhost:5000/api/staff/fetchstaffbyId",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token'),
                        'id':id
                    },
                  });
                  const json=await response.json()
                  console.log(json);
        navigate('edituser', { state: { staffId:json[0]._id,userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id,user:"director",salary:json[0]?.salary,availability_status:json[0]?.availability_status} });

    }
    else if(role?.name=="manager")
    {
      const response=await fetch("http://localhost:5000/api/staff/fetchstaffbyId",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token'),
                        'id':id
                    },
                  });
                  const json=await response.json()
                  console.log(json);
        navigate('edituser', { state: { staffId:json[0]._id,userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id,user:"manager",salary:json[0]?.salary,availability_status:json[0]?.availability_status} });

    }
    else if(role?.name=="vendor")
    {
      const response=await fetch("http://localhost:5000/api/vendor/fetchvendorbyId",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token'),
                        'id':id
                    },
                  });
                  const json=await response.json()
                  console.log(json[0]?._id);
        navigate('edituser', { state: { vendorId:json[0]?._id,userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id,user:"vendor",service_type:json[0]?.service_type,rating:json[0]?.rating} });

    }
    else if(role?.name=="waiter")
    {
      console.log("waiterbabc");
      const response=await fetch("http://localhost:5000/api/waiter/fetchwaiterbyId",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token'),
                        'id':id
                    },
                  });
                  const json=await response.json()
                  console.log(json);
        navigate('edituser', { state: { waiterId:json[0]?._id,userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id,user:"waiter",experienceLevel:json[0]?.experienceLevel,salary:json[0]?.salary} });

    }
    else if(role?.name=="photographer")
    {
      const response=await fetch("http://localhost:5000/api/photographer/fetchphotographerbyId",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token'),
                        'id':id
                    },
                  });
                  const json=await response.json()
                  console.log(json);
        navigate('edituser', { state: { photographerId:json[0]._id,userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id,user:"photographer",rate:json[0].rate,availability_status:json[0].availability_status} });

    }
    else{
    navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
     
    }
    //navigate('edituser', { state: { userId:id,name:Name,email:Email,phone:Phone,password:Password,roleId:role_id} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteUser(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
const getRoleById = (id) => roles.find(d => d._id === id);
  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getUsers();
        const result2 = await getRoles();
        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add User</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Users Data</h3>
        <div className="me-5" style={{display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '0px 15px'}}>
        <input
          type="text"
          placeholder="Search..."
          className="me-2 mt-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{border: 'none',
      outline: 'none',
      flexGrow: '1',
      padding: '5px',
      fontSize: '16px'}}
        />
        <FaSearch style={{color: '#888',marginLeft: '0px',cursor:'pointer'}} onClick={handleSearchClick}/>
        </div>
      </div>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const role = getRoleById(row.role_id);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              
              <td>{row.fullName}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{role?.name}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row.fullName,row.email,row.phone,role?.name,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.fullName,row.email,row.phone,row.password,row.role_id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              </td>
            </tr>
            )
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUser
