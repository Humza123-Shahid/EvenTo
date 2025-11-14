import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewAssignment = () => {
     const location = useLocation();
    const user=location.state?.userName || {};
    const role=location.state?.roleName || {};
    const eventName=location.state?.event || {};
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
            <th>Shift Start</th>
            <th>Shift End</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{index}</td>
              <td>{user} - {role}</td>
              <td>{eventName}</td>
              <td>{shiftStart}</td>
              <td>{shiftEnd}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewAssignment
