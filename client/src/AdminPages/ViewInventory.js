import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewInventory = () => {
     const location = useLocation();
    const Inventory=location.state?.inventory || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Inventory Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Rental Price</th>
            <th>Available Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Inventory._id}>
              <td>{index}</td>
              <td>{Inventory.name}</td>
              <td>{Inventory.category}</td>
              <td>{Inventory.rentalPrice}</td>
              <td>{Inventory.availableQuantity}</td>
              <td>{Inventory.status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewInventory
