import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewDestination = () => {
     const location = useLocation();
    const Permission=location.state?.permission || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Permission Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Permission._id}>
              <td>{index}</td>
              <td>{Permission.permission}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewDestination
