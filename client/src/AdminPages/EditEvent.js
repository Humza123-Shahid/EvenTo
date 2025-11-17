import React,{useState,useContext,useEffect} from 'react'
import { useLocation } from 'react-router-dom';

import eventContext from '../context/eventContext'
import roleContext from '../context/roleContext'
import venueContext from '../context/venueContext'

import InfoMessage from '../components/InfoMessage';

const EditEvent = () => {
    
    const context2=useContext(eventContext);
      const {editEvent}=context2;
      const context3=useContext(roleContext);
      const {roles,getRoles}=context3;
      const context4=useContext(venueContext);
      const {venues,getVenues}=context4;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
     const location = useLocation();
    const Events=location.state?.event || {};
     const Organizer=location.state?.organizer || {};
     const Venue=location.state?.venue || {};    
    const [users, setUsers] = useState([]);
    const [users2, setUsers2] = useState([]);
        const [name, setName] = useState(Events.eventName);
        const [status, setStatus] = useState(Events.status);
        const [venue, setVenue] = useState(Events.venue);
    const [category, setCategory] = useState(Events.category);
    const [description, setDescription] = useState(Events.description);
    const [organizer, setOrganizer] = useState(Events.organizer);
    const [date, setDate] = useState(formatDate(new Date(Events.eventDate)));
    const [date2, setDate2] = useState("");
  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const handleVenueChange = (e) => {
    setVenue(e.target.value); // <-- Get input value here
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // <-- Get input value here
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // <-- Get input value here
  };
  const handleChangeOrganizer = (event) => {
    setOrganizer(event.target.value); 
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
    // const newTime = `${event.target.value}T05:00:00`
    // setDate2(newTime);
  };
  const editEvents=async (e)=>{
          e.preventDefault();
          const success= await editEvent(Events._id,organizer,name,description,category,venue,date,status)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Event updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
      const getRoleByName = (name) => roles.find(d => d.name=== name);
      const getUserById = (id) => users.find(u => u.role_id=== id);
      const targetRole = roles.find(role => role.name == "organizer");
  const targetRoleId = targetRole ? targetRole._id : null;

  // 3. Filter Users by Role ID
  const usersWithTargetRole = targetRoleId
    ? users.filter(user => user.role_id === targetRoleId)
    : [];
//       useEffect(() => {
        
//             console.log(users)
//             const User = users.find(u => u.role_id== role2?._id);
//             console.log(User)

//              setUsers2(User)
//           setDataLoaded(true);
//           }, [users]); 
// useEffect(() => {
//             console.log(roles)
//             const Role = roles.find(d => d.name== "organizer");
//             console.log(Role)
//            setRole2(Role)
           
//           }, [roles]); 
    
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            
            const result2 = await getRoles();
            const result3 = await getVenues();

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
    <form onSubmit={editEvents}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Organizer:</label>
        
        <select id="mySelect" className="form-control "  value={organizer} onChange={handleChangeOrganizer}>
            <option value="">-Select-</option>
            {Array.isArray(usersWithTargetRole) && usersWithTargetRole.map((row) => {
            return(
                <option value={row._id}>{row.fullName}</option>
            )
            })}
        </select>       
            </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Enter Event Name:</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="description" className="form-label">Enter Description:</label>
            <input type="text" className="form-control" id="description" value={description} name="description" onChange={handleDescriptionChange} />
      </div>
   
      </div>
      <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="category" className="form-label">Enter Category:</label>
            <input type="text" className="form-control" id="category" value={category} name="category" onChange={handleCategoryChange} />
      </div>
    
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="venue" className="form-label">Select Venue</label>
        {/* <input type="number" className="form-control" id="venue" value={venue} name="venue" onChange={handleVenueChange} /> */}
         <select id="mySelect" className="form-control "  value={venue} onChange={handleVenueChange}>
            <option value="">-Select-</option>
            {Array.isArray(venues) && venues.map((row) => {
            return(
                <option value={row._id}>{row.venueName}</option>
            )
            })}
        </select>   
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="date" className="form-label">Select Date:</label>
      <input type="date" className="form-control" id="date" value={date} name="date" onChange={handleDateChange} />

      </div>
     
      </div>
    <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} />
      </div>
      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      
      </div>
      <button disabled={name.length<1||status.length<1||category.length<1||description.length<1||organizer==''||venue==''} type="submit" className="btn btn-primary" >Edit Event</button>
      </form>
    </div>
  )
}

export default EditEvent
