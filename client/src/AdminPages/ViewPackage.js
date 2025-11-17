import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewPackage = () => {
     const location = useLocation();
    const Package=location.state?.package || {};
    const index=location.state?.idx;
     const Events=location.state?.event || {};
     const Status=Package.AvailabilityStatus?"Available":"UnAvailable";
  return (
    <div>
      <h1 className="ms-4">Package Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Event Name</th>
            <th>Package Name</th>
            <th>Package Type</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Package._id}>
              <td>{index}</td>
              <td>{Events.eventName}</td>
              <td>{Package.PackageName}</td>
              <td>{Package.PackageType}</td>
              <td>{Package.Description}</td>
              <td>{Package.Price}</td>
              <td>{Status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewPackage
