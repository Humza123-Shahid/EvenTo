import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewBeverage = () => {
     const location = useLocation();
    const Beverage=location.state?.beverage || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Beverage Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Available Quantity</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Beverage._id}>
              <td>{index}</td>
              <td>{Beverage.name}</td>
              <td>{Beverage.type}</td>
              <td>{Beverage.price}</td>
              <td>{Beverage.availableQuantity}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewBeverage
