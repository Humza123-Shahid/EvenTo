import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewDish = () => {
     const location = useLocation();
    const Dish=location.state?.dish || {};
    const index=location.state?.idx;
     const Menu=location.state?.menu || {};
  return (
    <div>
      <h1 className="ms-4">Dish Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Menu Name</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Dish._id}>
              <td>{index}</td>
              <td>{Dish.name}</td>
              <td>{Dish.category}</td>
              <td>{Dish.cost}</td>
              <td>{Menu.name}</td>
              <td>{Dish.ingredients}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewDish
