import BookingContext from "./bookingContext";
import { useState, useEffect  } from "react";

const BookingState=(props)=>{
  const host="http://localhost:5000"
  const bookingsInitial=[]

    const [bookings,setBookings]=useState(bookingsInitial)

    const getBookings=async ()=>{
      const response=await fetch(`${host}/api/booking/fetchallbookings`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setBookings(json)
    }
    const addBooking=async (user,event,quantity,totalAmount,bookingDate,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/booking/addbooking`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({user,event,quantity,totalAmount,bookingDate,status})
      });
      const book=await response.json();
      const normalizedData = Array.isArray(book.savedBooking) ? book.savedBooking : [book.savedBooking];
      //setBuses(buses.concat(bus.savedBus));
      setBookings(prevBookings => [...prevBookings, normalizedData])
      return book.success;
    }
    const deleteBooking= async(id)=>{
      const response=await fetch(`${host}/api/booking/deletebooking/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newBookings=bookings.filter((book)=>{return book._id!==id})
      setBookings(newBookings)
    }
    const editBooking=async(id,user,event,quantity,totalAmount,bookingDate,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/booking/updatebooking/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({user,event,quantity,totalAmount,bookingDate,status})
      });
      const json=await response.json();
      let newBookings=JSON.parse(JSON.stringify(bookings));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newBookings.length; index++) {
        const element = newBookings[index];
        if(element._id===id)
        {
          newBookings[index].user=user;
          newBookings[index].event=event;
          newBookings[index].quantity=quantity;
          newBookings[index].totalAmount=totalAmount;
          newBookings[index].bookingDate=bookingDate;
          newBookings[index].status=status;
          break;
        }
      }

      let a=0
      setBookings(newBookings);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <BookingContext.Provider value={{bookings,addBooking,deleteBooking,editBooking,getBookings}}>
            {props.children}
        </BookingContext.Provider>
    )
}
export default BookingState;