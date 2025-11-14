
import React,{useState,useEffect,useContext} from 'react'
import assignmentContext from '../context/assignmentContext'
import staffContext from '../context/staffContext'
import eventContext from '../context/eventContext'
import roleContext from '../context/roleContext'

import InfoMessage from '../components/InfoMessage';

const AddAssignment = () => {
    const context=useContext(assignmentContext);
    const {addAssignment}=context;
    const context2=useContext(staffContext);
    const {staffs,getStaffs}=context2;
    const context3=useContext(eventContext);
    const {events,getEvents}=context3;
    const context4=useContext(roleContext);
    const {roles,getRoles}=context4;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
        const [staff, setStaff] = useState([]);
    // const [departureTime, setDepartureTime] = useState("");
    // const [arrivalTime, setArrivalTime] = useState("");
    const [users, setUsers] = useState([]);
    const [shiftStart, setShiftStart] = useState("");
    const [shiftEnd, setShiftEnd] = useState("");
    const [departureTime2, setDepartureTime2] = useState("");
    const [arrivalTime2, setArrivalTime2] = useState("");
    const [date, setDate] = useState("");
    const [date2, setDate2] = useState("");
    const [staffName, setStaffName] = useState('');
    const [allStaffValue, setAllStaffValue] = useState([]);
    const [selectedStaffValue, setSelectedStaffValue] = useState('');
    const [selectedEventValue, setSelectedEventValue] = useState('');
    const [selectedRoleValue, setSelectedRoleValue] = useState('');
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
   
  const addAssignments=async ()=>{
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
         console.log(arrivalTime2);
         console.log(date2);
         const myStaff = staff.join(",");
         console.log(allStaffValue);
          const success=await addAssignment(allStaffValue,selectedEventValue,shiftStart,shiftEnd)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Assignment added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
    const getUserById = (id) => users?.find(d => d._id === id);
    const getRoleById = (id) => roles?.find(d => d._id === id);

    const addOption = (e) => {
               e.preventDefault();
console.log("abc")
      const selectElement = document.getElementById('mySelect3');
      const selectedIndex = selectElement.selectedIndex;
        const selectedOption = selectElement.options[selectedIndex];
        if(selectedOption.innerHTML=="-Select-")
        {
          //setStaff(prev => [...prev, ""]);
          return; 
        }
        else{
          console.log("setabc");
          const check=staff.includes(selectedOption.innerHTML);
          const check2=allStaffValue.includes(selectedStaffValue);

          if(!check || !check2)
          {
            setStaff(prev => [...prev, selectedOption.innerHTML]);
          }
        }
        console.log(selectedStaffValue)
        const check3=allStaffValue.includes(selectedStaffValue);
         if(!check3)
          {
            setAllStaffValue(prev => [...prev, selectedStaffValue]);
          }
        setSelectedStaffValue('');
        
    }
    // const handleChange = (index, newValue) => {
    // setStaff(prev =>
    //   prev.map((item, i) => (i === index ? newValue : item))
    // );
    
    
  //};
  const handleClose = (indexToRemove) => {
  // e.preventDefault();
  setStaff(prev => prev.filter((_, index) => index !== indexToRemove));
  setAllStaffValue(prev => prev.filter((_, index) => index !== indexToRemove));

   //setSelected('');
   
    
   
}
useEffect(() => {
           console.log(allStaffValue);
          }, [allStaffValue]); 
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
    <form>
    <div className='mx-0' style={{display:'flex'}}>
      
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Event:</label>
      <select id="mySelect" className="form-control "  value={selectedEventValue} onChange={handleChangeEvent}>
        <option value="">-Select-</option>
        {events.map((row) => (
        <option value={row._id}>{row.eventName}</option>
        ))}
      </select>
    </div>
    {/* <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect2" className="form-label">Select Role:</label>
      <select id="mySelect2" className="form-control "  value={selectedRoleValue} onChange={handleChangeRole}>
        <option value="">-Select-</option>
        {roles.map((row) => (
        <option value={row._id}>{row.name}</option>
        ))}
      </select>
    </div> */}
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shiftstart" className="form-label">Select Shift Start:</label>
            <input type="datetime-local" className="form-control" id="shiftstart" value={shiftStart} name="shiftstart" onChange={handleShiftStartChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="shiftend" className="form-label">Select Shift End:</label>
            <input type="datetime-local" className="form-control" id="shiftend" value={shiftEnd} name="shiftend" onChange={handleShiftEndChange} />
      </div>
    </div>
      {/* <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div> */}
    </form>
    <div className="mb-3 my-3 me-3" style={{width:'39%'}}>
      
      <label htmlFor="mySelect3" className="form-label">Select User:</label>
      <div className='d-flex'>
      <select id="mySelect3" className="form-control "  value={selectedStaffValue} onChange={handleChangeStaff}>
        <option value="">-Select-</option>
        {/* {staffs.map((row) => { */}
        {users.map((user) => {
        //const user = getUserById(row.user_id);
        const role = getRoleById(user?.role_id);

        // setStaffName(user?.fullName);
        return(
        <option value={user._id}>{user?.fullName} - {role?.name}</option>)
      })}
      </select>
      <button onClick={addOption} style={{width:'20%',marginLeft:'5px'}}>Add User</button>
      </div>
    </div>
     <div style={{ marginTop: '20px' }}>
        {staff.map((stf, index) => (
          <>
          <div className='d-flex my-3'>
            {/* <input className="form-check-input" type="radio" value={option} checked={selectedOption.value== option && index==selectedOption.index} onChange={(e) =>handleSelect(index, option)} style={{marginTop: '10px',marginRight:'5px'}} name="flexRadioDefault" id="flexRadioDefault1"/> */}
            {/* <label>{textInput.value}</label>  */}
             {/* <input type='text' className='form-control' value={stf} style={{width:"32.2%"}} id='option1' onChange={(e) => handleChange(index, e.target.value)} name='option1' minLength={1} required/> */}
             <input type='text' className='form-control' value={stf} style={{width:"32.2%"}} id='option1' name='option1' readonly/>
             {/* <span>{option}</span> */}
            <button 
              // onClick={() => handleClose(index)}
               onClick={() => handleClose(index)}
              style={{
                background: 'none',
                backgroundColor:'red',
                color:'white',
                marginLeft:'20px',
                marginBottom:'10px',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            </div>
        </>
        ))}
      </div> 
      <button disabled={shiftStart.length<1||shiftEnd.length<1||staff.length<1||selectedEventValue==''} type="submit" className="btn btn-primary" onClick={() => {addAssignments()}}>Add Assignment</button>
      
    </div>
  )
}

export default AddAssignment
