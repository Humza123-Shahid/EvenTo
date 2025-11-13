import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import assignmentContext from '../context/assignmentContext'
import staffContext from '../context/staffContext'
import eventContext from '../context/eventContext'
import roleContext from '../context/roleContext'
import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminAssigment = () => {
    const context=useContext(assignmentContext);
    const {assignments,deleteAssignment,getAssignments}=context;
    const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(eventContext);
    const {events,getEvents}=context3;
    const context4=useContext(roleContext);
    const {roles,getRoles}=context4;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const handleClick = () => {
        navigate('addassignment');

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
  const getUserById = (id) => users?.find(d => d._id === id);
 const joinedData=assignments.map(item=>{
  const staff=staffs.find(stf => stf._id === item.staff_id)
  const user = getUserById(staff?.user_id);
  const event=events.find(evt =>evt._id === item.event_id)
  const role=roles.find(rl => rl._id === item.role_id)
 return{
  ...item,
  staffName:user?user.fullName:'unKnown',
  eventName:event?event.eventName:'unKnown',
  roleName:role?role.name:'unKnown'
 }
 })
  const filteredData = joinedData.filter(item =>
      item.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roleName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (staffName,eventName,roleName,shiftStart,shiftEnd,index) => {
    //const dataitem=buses.find(da => da._id ==id)
    //const datadriver=getDriverById(driverId);
    navigate('getassignment', { state: { staff:staffName,event:eventName,role:roleName,start:shiftStart,end:shiftEnd,idx:index+1} });
     
  };
  const handleEdit = (id,staff_id,event_id,role_id,shiftStart,shiftEnd) => {
    //const dataitem=buses.find(da => da._id ==id)
    //const datadriver=getDriverById(driverId);
    navigate('editassignment', { state: { assignId:id,staffId:staff_id,eventId:event_id,roleId:role_id,start:shiftStart,end:shiftEnd} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteAssignment(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
//const getDriverById = (id) => drivers.find(d => d._id === id);
  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getAssignments();
        const result2 = await getStaffs();
        const result3 = await getEvents();
        const result4 = await getRoles();
         const response=await fetch(`http://localhost:5000/api/user/fetchallusers`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')

                        }
                })
            const json=await response.json();
            
            setUsers(json)
        //ssconst result2 = await getDrivers();
        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Assignment</button>
      <div className="container d-flex justify-content-between">
        <h3 className="ms-2">Assignment Data</h3>
        <div className="me-1" style={{display: 'flex',
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
            <th>Staff</th>
            <th>Event</th>
            <th>Role</th>
            <th>Shift Start</th>
            <th>Shift End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredData) && filteredData.map((row,index) => {
            //const driver = getDriverById(row.driver_id);
             const formattedShiftStart = new Date(row?.shift_start).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true // Ensures AM/PM
          });
          const formattedShiftEnd = new Date(row?.shift_end).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true // Ensures AM/PM
          });
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{row.staffName}</td>
              <td>{row.eventName}</td>
              <td>{row.roleName}</td>
              <td>{formattedShiftStart}</td>
              <td>{formattedShiftEnd}</td>

              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row.staffName,row.eventName,row.roleName,formattedShiftStart,formattedShiftEnd,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.staff_id,row.event_id,row.role_id,row?.shift_start,row?.shift_end)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminAssigment
