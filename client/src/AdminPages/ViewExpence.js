import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewExpence = () => {
     const location = useLocation();
    const Expence=location.state?.expence || {};
    const index=location.state?.idx;
     const Events=location.state?.event || {};
      const dateObject = new Date(Expence.date);
    //  dateObject.setHours(dateObject.getHours() - 5);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  return (
    <div>
      <h1 className="ms-4">Expence Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Event</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Expence._id}>
              <td>{index}</td>
              <td>{Events.eventName}</td>
              <td>{Expence.category}</td>
              <td>{Expence.amount}</td>
              <td>{Expence.description}</td>
              <td>{formattedDate}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewExpence
