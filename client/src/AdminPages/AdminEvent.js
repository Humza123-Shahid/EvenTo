import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import eventContext from '../context/eventContext'
import venueContext from '../context/venueContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminEvent = () => {

     const context2=useContext(eventContext);
    const {events,deleteEvent,getEvents}=context2;
    const context4=useContext(venueContext);
    const {venues,getVenues}=context4;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addevent');

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
  const joinedData=events.map(item=>{
  //const staff=staffs.find(stf => stf._id === item.staff_id)
  const user=users.find(u => u._id === item.organizer)
  //const user = getUserById(staff?.user_id);
  const venue=venues.find(vn =>vn._id === item.venue)
  //const role=roles.find(rl => rl._id === user?.role_id)
 return{
  ...item,
  organizerName:user?user.fullName:'unKnown',
  venueName:venue?venue.venueName:'unKnown'
  //roleName:role?role.name:'unKnown'
 }
 })
  const filteredData = joinedData.filter(item =>
      item.organizerName?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.venueName?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.eventName?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index,organizerId,venueId) => {
    const dataitem=events.find(da => da._id ==id)
    const dataorganizer=getOrganizerById(organizerId);
    const datavenue=getVenueById(venueId);
    navigate('getevent', { state: { event:dataitem,idx:index,organizer:dataorganizer,venue:datavenue} });
     
  };
  const handleEdit = (id) => {
    const dataitem=events.find(da => da._id ==id)
    navigate('editevent', { state: { event:dataitem} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteEvent(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getOrganizerById = (id) => users.find(d => d._id === id);
  const getVenueById = (id) => venues.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        const result2 = await getEvents();
        const result4 = await getVenues();
         const response=await fetch(`http://localhost:5000/api/user/fetchallusers`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')

                        }
                })
            const json=await response.json();
            
            setUsers(json)
        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Event</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Event Data</h3>
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
            <th>Organizer</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Venue</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{row?.organizerName}</td>
              <td>{row.eventName}</td>
              <td>{row.description}</td>
              <td>{row.category}</td>
              <td>{row.venueName}</td>
              
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.organizer,row.venue)}>
                View
              </button>
                <button onClick={() => handleEdit(row._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
              {/* <button onClick={() => handleEdit(row._id,row.organizer,row.venue)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}> */}
                Edit
              </button>
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              </td>
            </tr>)
        })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEvent