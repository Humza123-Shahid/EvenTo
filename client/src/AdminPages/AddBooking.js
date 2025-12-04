import React,{useState,useContext,useEffect} from 'react'
import bookingContext from '../context/bookingContext'
import roleContext from '../context/roleContext'
import eventContext from '../context/eventContext'

import InfoMessage from '../components/InfoMessage';

const AddBooking = () => {
    
    const context2=useContext(bookingContext);
      const {addBooking}=context2;
      const context3=useContext(roleContext);
      const {roles,getRoles}=context3;
      const context4=useContext(eventContext);
      const {events,getEvents}=context4;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
        
    const [users, setUsers] = useState([]);
     const [userName, setUserName] = useState('');
    const [users2, setUsers2] = useState([]);
        const [name, setName] = useState('');
        const [status, setStatus] = useState('');
    const [tamount, setTAmount] = useState('');
    const [quantity, setQuantity] = useState('');
    const [user, setUser] = useState('');
    const [date, setDate] = useState(undefined);
    const [date2, setDate2] = useState(undefined);
  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handletotalAmountChange = (e) => {
    setTAmount(e.target.value); // <-- Get input value here
  };
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value); // <-- Get input value here
  };
  const handleChangeUserName = (event) => {
    setUserName(event.target.value); 
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
    const newTime = `${event.target.value}T05:00:00`
    setDate2(newTime);
  };
  const addBookings=async (e)=>{
          e.preventDefault();
          const success= await addBooking(userName,name,quantity,tamount,date2,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Booking added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
const targetRole = roles?.find(role => role.name == "user");
  const targetRoleId = targetRole ? targetRole._id : null;

  // 3. Filter Users by Role ID
  const usersWithTargetRole = targetRoleId
    ? users.filter(user => user.role_id === targetRoleId)
    : [];

    
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            
            const result2 = await getRoles();
            const result3 = await getEvents();

            //setRole3(roles);
            const response=await fetch(`http://localhost:5000/api/user/fetchallusers`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')

                        }
                })
            const json=await response.json();
            setUsers(json)
            // const Role = roles.find(d => d.name== "organizer");
            // console.log(Role)
            // const User = getUserById(Role._id);
            // console.log(User)

            // setUsers2(User)
            
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addBookings}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select User:</label>
        
        <select id="mySelect" className="form-control "  value={userName} onChange={handleChangeUserName}>
            <option value="">-Select-</option>
            {Array.isArray(usersWithTargetRole) && usersWithTargetRole.map((row) => {
            return(
                <option value={row._id}>{row.fullName}</option>
            )
            })}
        </select>       
            </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Select Event Name:</label>
        <select id="mySelect" className="form-control "  value={name} onChange={handleNameChange}>
            <option value="">-Select-</option>
            {Array.isArray(events) && events.map((row) => {
            return(
                <option value={row._id}>{row.eventName}</option>
            )
            })}
        </select>  
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="quantity" className="form-label">Enter Quantity:</label>
            <input type="number" className="form-control" id="quantity" value={quantity} name="quantity" onChange={handleQuantityChange} />
      </div>
   
      </div>
      <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="tamount" className="form-label">Enter Total Amount:</label>
            <input type="number" className="form-control" id="tamount" value={tamount} name="tamount" onChange={handletotalAmountChange} />
      </div>
    
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="date" className="form-label">Select Booking Date:</label>
      <input type="date" className="form-control" id="date" value={date} name="date" onChange={handleDateChange} />

      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} />
      </div>
      </div>
      <button disabled={name.length<1||status.length<1||tamount.length<1||quantity.length<1||userName==''} type="submit" className="btn btn-primary" >Add Booking</button>
      </form>
    </div>
  )
}

export default AddBooking
