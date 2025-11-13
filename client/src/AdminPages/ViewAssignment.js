import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewAssignment = () => {
     const location = useLocation();
    const staffName=location.state?.staff || {};
    const eventName=location.state?.event || {};
    const roleName=location.state?.role|| {};
    const shiftStart=location.state?.start || {};
    const shiftEnd=location.state?.end || {};
    const index=location.state?.idx;

  return (
    <div>
      <h1 className="ms-4">Assignment Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Staff</th>
            <th>Event</th>
            <th>Role</th>
            <th>Shift Start</th>
            <th>Shift End</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{staffName}</td>
              <td>{eventName}</td>
              <td>{roleName}</td>
              <td>{shiftStart}</td>
              <td>{shiftEnd}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewAssignment
