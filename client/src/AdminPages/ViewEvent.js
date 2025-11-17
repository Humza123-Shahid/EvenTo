import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewEvent = () => {
     const location = useLocation();
    const Event=location.state?.event || {};
    const index=location.state?.idx;
     const Organizer=location.state?.organizer || {};
     const Venue=location.state?.venue || {};
      const dateObject = new Date(Event.eventDate);
    //  dateObject.setHours(dateObject.getHours() - 5);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  return (
    <div>
      <h1 className="ms-4">Event Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Organizer</th>
            <th>Event Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Venue</th>
            <th>Event Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Event._id}>
              <td>{index}</td>
              <td>{Organizer.fullName}</td>
              <td>{Event.eventName}</td>
              <td>{Event.description}</td>
              <td>{Event.category}</td>
              <td>{Venue.venueName}</td>
              <td>{formattedDate}</td>
              <td>{Event.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewEvent
