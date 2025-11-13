import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewDestination = () => {
     const location = useLocation();
    const Role=location.state?.role || {};
    const index=location.state?.idx;
    const Status=Role.status?"Active":"InActive";
  return (
    <div>
      <h1 className="ms-4">Destination Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Role._id}>
              <td>{index}</td>
              <td>{Role.name}</td>
              <td>{Status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewDestination
