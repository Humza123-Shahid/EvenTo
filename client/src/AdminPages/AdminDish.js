import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import dishContext from '../context/dishContext'
import eventContext from '../context/eventContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminExpence = () => {
    const context=useContext(dishContext);
    const {dishes,deleteDish,getDishes}=context;
    //  const context2=useContext(eventContext);
    // const {events,getEvents}=context2;
        const [menus, setMenus] = useState([]);
    
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('adddish');

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
  const filteredData = dishes.filter(item =>
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index,menuId) => {
    const dataitem=dishes.find(da => da._id ==id)
     //const datacat=getCategoryById(catId);
          const datamenu=getMenuById(menuId);

    navigate('getdish', { state: { dish:dataitem,idx:index,menu:datamenu} });
     
  };
  const handleEdit = (id,menuId) => {
    const dataitem=dishes.find(da => da._id ==id)
    const datamenu=getMenuById(menuId);
    console.log(datamenu)
    //const datacat=getCategoryById(catId);
    navigate('editdish', { state: { dish:dataitem,menu:datamenu} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteDish(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getMenuById = (id) => menus.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getDishes();
        //const result2 = await getEvents();
          const response=await fetch(`http://localhost:5000/api/menu/fetchallmenus`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')

                        }
                })
            const json=await response.json();
            
            setMenus(json)
        //const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Dish</button>
      <div className="container d-flex justify-content-between">
        <h3 className="ms-2">Expence Data</h3>
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
            <th>Name</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const MenuName = getMenuById(row.menu_id);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{row.name}</td>
              <td>{row.category}</td>
              <td>{row.cost}</td>
              
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.menu_id)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.menu_id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminExpence
