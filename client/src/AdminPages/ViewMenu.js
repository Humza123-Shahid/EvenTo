import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewMenu = () => {
     const location = useLocation();
    const Menu=location.state?.menu || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Menu Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price Per Person</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Menu._id}>
              <td>{index}</td>
              <td>{Menu.name}</td>
              <td>{Menu.type}</td>
              <td>{Menu.pricePerPerson}</td>
              <td>{Menu.description}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewMenu
