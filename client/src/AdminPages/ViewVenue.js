import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewVenue = () => {
     const location = useLocation();
    const Venue=location.state?.venue || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Venue Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Venue Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Capacity</th>
            <th>Contact Person</th>
            <th>Contact Phone</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Venue._id}>
              <td>{index}</td>
              <td>{Venue.venueName}</td>
              <td>{Venue.address}</td>
              <td>{Venue.city}</td>
              <td>{Venue.capacity}</td>
              <td>{Venue.contactPerson}</td>
              <td>{Venue.contactPhone}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewVenue
