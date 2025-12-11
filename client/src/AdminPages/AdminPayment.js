import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import paymentContext from '../context/paymentContext'
import bookingContext from '../context/bookingContext'

import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminPayment = () => {

     const context=useContext(paymentContext);
    const {payments,deletePayment,getPayments}=context;
     const context2=useContext(bookingContext);
    const {bookings,getBookings}=context2;

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addpayment');

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
  const joinedData=payments.map(item=>{
  //const staff=staffs.find(stf => stf._id === item.staff_id)
  const user=users.find(u => u._id === item.user)
  //const user = getUserById(staff?.user_id);
  const booking=bookings.find(bk =>bk._id === item.booking)
  //const role=roles.find(rl => rl._id === user?.role_id)
 return{
  ...item,
  userName:user?user.fullName:'unKnown',
  bookingName:booking?booking.bookingDate:'unKnown'
  //roleName:role?role.name:'unKnown'
 }
 })
  const filteredData = joinedData.filter(item =>
     item.userName?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())||
     item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index,userId,bookingId,bookingDate) => {
    const dataitem=payments.find(da => da._id ==id)
    const datauser=getUserById(userId);
    const databooking=getBookingById(bookingId);
    navigate('getpayment', { state: { payment:dataitem,idx:index,user:datauser,booking:databooking,date:bookingDate} });
     
  };
  const handleEdit = (id) => {
    const dataitem=payments.find(da => da._id ==id)
    navigate('editpayment', { state: { payment:dataitem} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deletePayment(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
   const getUserById = (id) => users.find(d => d._id === id);
  const getBookingById = (id) => bookings.find(d => d._id === id);


  useEffect(() => {
        const fetchData = async () => {
        const result2 = await getPayments();
        const result3 = await getBookings();
        
        //const result4 = await getVenues();
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
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Payment</button>
      <div className="d-flex justify-content-between" style={{
      margin: '20px 0px 0px 15px',
      padding: '0px'}}>
        <h3 className="ms-2">Payment Data</h3>
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
            <th>User</th>
            <th>Booking</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Transaction Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const formattedBookingDate = new Date(row?.bookingName).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{row?.userName}</td>
              <td>{formattedBookingDate}</td>
              <td>{row.amount}</td>
              <td>{row.paymentMethod}</td>
              <td>{row.transactionId}</td>
              
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.user,row.booking,formattedBookingDate)}>
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

export default AdminPayment