import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewPayment = () => {
     const location = useLocation();
    const Payment=location.state?.payment || {};
    const index=location.state?.idx;
     const User=location.state?.user || {};
     const Booking=location.state?.booking || {};
    const bookingDate=location.state?.date || {};
      const dateObject = new Date(Payment.paymentDate);
    //  dateObject.setHours(dateObject.getHours() - 5);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  return (
    <div>
      <h1 className="ms-4">Payment Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Booking</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Transaction Id</th>
            <th>Status</th>
            <th>Payment Date</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Payment._id}>
              <td>{index}</td>
              <td>{User.fullName}</td>
              <td>{bookingDate}</td>
              <td>{Payment.amount}</td>
              <td>{Payment.paymentMethod}</td>
              <td>{Payment.transactionId}</td>
              <td>{Payment.status}</td>
              <td>{formattedDate}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewPayment
