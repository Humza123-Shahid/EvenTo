
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import assignmentContext from '../context/assignmentContext'
import staffContext from '../context/staffContext'
import eventContext from '../context/eventContext'
import roleContext from '../context/roleContext'

import InfoMessage from '../components/InfoMessage';

const EditAssignment = () => {
    
    const location = useLocation();
    const context=useContext(assignmentContext);
    const {editAssignment}=context;
    const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(eventContext);
    const {events,getEvents}=context3;
    const context4=useContext(roleContext);
    const {roles,getRoles}=context4;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    // const [departureTime, setDepartureTime] = useState("");
    // const [arrivalTime, setArrivalTime] = useState("");
    const [users, setUsers] = useState([]);
     const formatForInput = (isoString) => {
      if (!isoString) return ''; // Handle cases where the string might be empty or null
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const [shiftStart, setShiftStart] = useState(formatForInput(location.state?.start)|| {});
    const [shiftEnd, setShiftEnd] = useState(formatForInput(location.state?.end)|| {});
    const [departureTime2, setDepartureTime2] = useState("");
    const [arrivalTime2, setArrivalTime2] = useState("");
    const [date, setDate] = useState("");
    const [date2, setDate2] = useState("");
    const [selectedStaffValue, setSelectedStaffValue] = useState(location.state?.staffId|| {});
    const [selectedEventValue, setSelectedEventValue] = useState(location.state?.eventId|| {});
    const [selectedRoleValue, setSelectedRoleValue] = useState(location.state?.roleId|| {});
    //const [fareAmount, setFareAmount] = useState(0);

      
    const handleShiftStartChange = (e) => {
    setShiftStart(e.target.value); // <-- Get input value here
    // const newTime =`1970-01-01T${e.target.value}:00`
    // setDepartureTime2(newTime);
  };
  const handleShiftEndChange = (e) => {
    setShiftEnd(e.target.value); // <-- Get input value here
    // const newTime = `1970-01-01T${e.target.value}:00`
    // setArrivalTime2(newTime);
  };
//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//     const newTime = `${event.target.value}T05:00:00`
//     setDate2(newTime);
//   };
  const handleChangeStaff = (event) => {
    setSelectedStaffValue(event.target.value);
     
  };
  const handleChangeEvent = (event) => {
    setSelectedEventValue(event.target.value);
     
  };
  const handleChangeRole = (event) => {
    setSelectedRoleValue(event.target.value);
     
  };
//   const handleFareChange = (event) => {
//     setFareAmount(event.target.value); 
//   };
   
  const editAssignments=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
         console.log(arrivalTime2);
         console.log(date2);
          const success=await editAssignment(location.state?.assignId||{},selectedStaffValue,selectedEventValue,selectedRoleValue,shiftStart,shiftEnd)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Assignment updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
        const getUserById = (id) => users?.find(d => d._id === id);

useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getStaffs();
            const result2 = await getEvents();
            const result3 = await getRoles();
            const response=await fetch(`http://localhost:5000/api/user/fetchallusers`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')

                        }
                })
            const json=await response.json();
            
            setUsers(json)
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editAssignments}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Staff:</label>
      <select id="mySelect" className="form-control "  value={selectedStaffValue} onChange={handleChangeStaff}>
        <option value="">-Select-</option>
        {staffs.map((row) => {
        const user = getUserById(row.user_id);
        return(
        <option value={row._id}>{user?.fullName}</option>)
      })}
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Event:</label>
      <select id="mySelect" className="form-control "  value={selectedEventValue} onChange={handleChangeEvent}>
        <option value="">-Select-</option>
        {events.map((row) => (
        <option value={row._id}>{row.eventName}</option>
        ))}
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Role:</label>
      <select id="mySelect" className="form-control "  value={selectedRoleValue} onChange={handleChangeRole}>
        <option value="">-Select-</option>
        {roles.map((row) => (
        <option value={row._id}>{row.name}</option>
        ))}
      </select>
    </div>
    </div>
      <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shiftstart" className="form-label">Select Shift Start:</label>
            <input type="datetime-local" className="form-control" id="shiftstart" value={shiftStart} name="shiftstart" onChange={handleShiftStartChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shiftend" className="form-label">Select Shift End:</label>
            <input type="datetime-local" className="form-control" id="shiftend" value={shiftEnd} name="shiftend" onChange={handleShiftEndChange} />
      </div>
      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div>
      
      <button disabled={shiftStart.length<1||shiftEnd.length<1||selectedStaffValue==''||selectedEventValue==''||selectedRoleValue==''} type="submit" className="btn btn-primary">Edit Assignment</button>
      </form>
    </div>
  )
}

export default EditAssignment
