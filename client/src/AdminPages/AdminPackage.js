import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import packageContext from '../context/packageContext'
import eventContext from '../context/eventContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminPackage = () => {
    const context=useContext(packageContext);
    const {packages,deletePackage,getPackages}=context;
     const context2=useContext(eventContext);
    const {events,getEvents}=context2;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addpackage');

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
  const filteredData = packages.filter(item =>
      item.PackageName?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.PackageType?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index,eventId) => {
    const dataitem=packages.find(da => da._id ==id)
     //const datacat=getCategoryById(catId);
          const dataevent=getEventById(eventId);

    navigate('getpackage', { state: { package:dataitem,idx:index,event:dataevent} });
     
  };
  const handleEdit = (id,eventId) => {
    const dataitem=packages.find(da => da._id ==id)
    const dataevent=getEventById(eventId);
    console.log(dataevent)
    //const datacat=getCategoryById(catId);
    navigate('editpackage', { state: { package:dataitem,event:dataevent} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deletePackage(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getEventById = (id) => events.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getPackages();
        const result2 = await getEvents();

        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Package</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Package Data</h3>
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
            <th>Event Name</th>
            <th>Package Name</th>
            <th>Package Type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const EventName = getEventById(row.EventID);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{EventName?.eventName}</td>
              <td>{row.PackageName}</td>
              <td>{row.PackageType}</td>
              <td>{row.Description}</td>
             
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.EventID)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.EventID)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminPackage
