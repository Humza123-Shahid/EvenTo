import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewBooking = () => {
     const location = useLocation();
    const Booking=location.state?.booking || {};
    const index=location.state?.idx;
     const User=location.state?.user || {};
     const Event=location.state?.event || {};
      const dateObject = new Date(Booking.bookingDate);
    //  dateObject.setHours(dateObject.getHours() - 5);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  return (
    <div>
      <h1 className="ms-4">Booking Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Event Name</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Booking Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Booking._id}>
              <td>{index}</td>
              <td>{User.fullName}</td>
              <td>{Event.eventName}</td>
              <td>{Booking.quantity}</td>
              <td>{Booking.totalAmount}</td>
              <td>{formattedDate}</td>
              <td>{Booking.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewBooking
