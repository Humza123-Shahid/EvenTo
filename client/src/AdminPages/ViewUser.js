import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewAssignment = () => {
     const location = useLocation();
    const Name=location.state?.name || {};
    const Email=location.state?.email || {};
    const Phone=location.state?.phone || {};
    const roleName=location.state?.role|| {};
    const index=location.state?.idx;

  return (
    <div>
      <h1 className="ms-4">User Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{Name}</td>
              <td>{Email}</td>
              <td>{Phone}</td>
              <td>{roleName}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewAssignment
