import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import venueContext from '../context/venueContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminVenue = () => {
    const context=useContext(venueContext);
    const {venues,deleteVenue,getVenues}=context;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addvenue');

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
  const filteredData = venues.filter(item =>
      item.venueName?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.address?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index) => {
    const dataitem=venues.find(da => da._id ==id)
    navigate('getvenue', { state: { venue:dataitem,idx:index} });
     
  };
  const handleEdit = (id) => {
    const dataitem=venues.find(da => da._id ==id)
    //const datacat=getCategoryById(catId);
    navigate('editvenue', { state: { venue:dataitem} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteVenue(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getVenues();
        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Venue</button>
      <div className="container d-flex justify-content-between">
        <h3 className="ms-2">Venue Data</h3>
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
            <th>Venue Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Capacity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{row.venueName}</td>
              <td>{row.address}</td>
              <td>{row.city}</td>
              <td>{row.capacity}</td>
             
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminVenue
