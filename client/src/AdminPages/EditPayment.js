import React,{useState,useContext,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import paymentContext from '../context/paymentContext'
import bookingContext from '../context/bookingContext'

import InfoMessage from '../components/InfoMessage';

const EditPayment = () => {
    
    const context2=useContext(paymentContext);
      const {editPayment}=context2;
    
      const context4=useContext(bookingContext);
      const {bookings,getBookings}=context4;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
         const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
    const location = useLocation();
    const Payment=location.state?.payment || {};
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState(Payment.user);
    const [users2, setUsers2] = useState([]);
        const [booking, setBooking] = useState(Payment.booking);
        const [status, setStatus] = useState(Payment.status);
    const [ paymentMethod, setPaymentMethod] = useState(Payment.paymentMethod);
    const [amount, setAmount] = useState(Payment.amount);
    const [transactionId, setTransactionId] = useState(Payment.transactionId);
    const [date, setDate] = useState(formatDate(new Date(Payment.paymentDate)));
    const [date2, setDate2] = useState(undefined);
  const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const handleBookingChange = (e) => {
    setBooking(e.target.value); // <-- Get input value here
  };
  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value); // <-- Get input value here
  };
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value); // <-- Get input value here
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value); // <-- Get input value here
  };
  const handleChangeUserName = (event) => {
    setUserName(event.target.value); 
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const editPayments=async (e)=>{
          e.preventDefault();
          console.log(userName,booking,amount,paymentMethod,transactionId,status,date);
          const success= await editPayment(Payment._id,userName,booking,amount,paymentMethod,transactionId,status,date)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Payment updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result3 = await getBookings();

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
    <form onSubmit={editPayments}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select User:</label>
        
         <select id="mySelect" className="form-control "  value={userName} onChange={handleChangeUserName}>
            <option value="">-Select-</option>
            {Array.isArray(users) && users.map((row) => {
            return(
                <option value={row._id}>{row.fullName}</option>
            )
            })}
        </select>        
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="booking" className="form-label">Select Booking:</label>
        <select id="mySelect" className="form-control "  value={booking} onChange={handleBookingChange}>
            <option value="">-Select-</option>
            {Array.isArray(bookings) && bookings.map((row) => {
                const formattedBookingDate = new Date(row?.bookingDate).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit'
            // hour: 'numeric',
            // minute: 'numeric',
            // hour12: true // Ensures AM/PM
          });
            return(
                <option value={row._id}>{formattedBookingDate}</option>
            )
            })}
        </select>      
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="amount" className="form-label">Enter Amount:</label>
            <input type="number" className="form-control" id="amount" value={amount} name="amount" onChange={handleAmountChange} />
      </div>
   
      </div>
      <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="pmethod" className="form-label">Enter Payment Method:</label>
            <input type="text" className="form-control" id="pmethod" value={paymentMethod} name="pmethod" onChange={handlePaymentMethodChange} />
      </div>
    
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="tId" className="form-label">Enter Transaction Id</label>
        {/* <input type="number" className="form-control" id="venue" value={venue} name="venue" onChange={handleVenueChange} /> */}
        <input type="text" className="form-control" id="tId" value={transactionId} name="tId" onChange={handleTransactionIdChange} /> 
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="status" className="form-label">Enter Status:</label>
      <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} />

      </div>
     
      </div>
    <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="date" className="form-label">Select Payment Date:</label>
            <input type="date" className="form-control" id="date" value={date} name="date" onChange={handleDateChange} />
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
      <button disabled={userName.length<1||paymentMethod.length<1||amount.length<1||booking==''||transactionId==''} type="submit" className="btn btn-primary" >Edit Payment</button>
      </form>
    </div>
  )
}

export default EditPayment
