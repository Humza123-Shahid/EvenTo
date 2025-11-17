
import React,{useState,useContext,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import packageContext from '../context/packageContext'
import eventContext from '../context/eventContext'

import InfoMessage from '../components/InfoMessage';

const EditPackage = () => {
    const context=useContext(packageContext);
    const {editPackage}=context;
    const context2=useContext(eventContext);
    const {events,getEvents}=context2;
    const location = useLocation();
    const Package=location.state?.package || {};
    const Events=location.state?.event || {};
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')

        const [price, setPrice] = useState(Package.Price);
    const [packageType, setPackageType] = useState(Package.PackageType);
    const [name, setName] = useState(Package.PackageName);
    const [description, setDescription] = useState(Package.Description);
    const [selectedEventValue, setSelectedEventValue] = useState(Package.EventID);
    console.log(Package.AvailabilityStatus)
    const [selectedStatusValue, setSelectedStatusValue] = useState(Package.AvailabilityStatus);
  const handlePriceChange = (e) => {
    setPrice(e.target.value); // <-- Get input value here
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleTypeChange = (e) => {
    setPackageType(e.target.value); // <-- Get input value here
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // <-- Get input value here
  };
  const handleChangeEvent = (event) => {
    setSelectedEventValue(event.target.value); 
  };
  const handleStatusChange = (e) => {
    setSelectedStatusValue(e.target.value === 'true'); // <-- Get input value here
  };
  const editPackages=async (e)=>{
          e.preventDefault();
          const success= await editPackage(Package._id,selectedEventValue,name,packageType,description,price,selectedStatusValue)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Package updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getEvents();
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editPackages}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Event Name:</label>
        <select id="mySelect" className="form-control "  value={selectedEventValue} onChange={handleChangeEvent}>
            <option value="">-Select-</option>
            {events.map((row) => (
            <option value={row._id}>{row.eventName}</option>
            ))}
        </select>        
            </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="pname" className="form-label">Enter Package Name:</label>
            <input type="text" className="form-control" id="pname" value={name} name="pname" onChange={handleNameChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="ptype" className="form-label">Enter Package Type:</label>
            <input type="text" className="form-control" id="ptype" value={packageType} name="ptype" onChange={handleTypeChange} />
      </div>
    
        
      </div>
      <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="description" className="form-label">Description:</label>
            <input type="text" className="form-control" id="description" value={description} name="description" onChange={handleDescriptionChange} />
      </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="price" className="form-label">Price:</label>
        <input type="number" className="form-control" id="price" value={price} name="price" onChange={handlePriceChange} />
    </div>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Availability Status:</label>
      <select id="mySelect" className="form-control " value={selectedStatusValue} onChange={handleStatusChange}>
        <option value="true">Available</option>
        <option value="false">UnAvailable</option>

      </select>
    </div>
      </div>
      <button disabled={name.length<1||packageType.length<1||price.length<1||description.length<1||selectedEventValue==''} type="submit" className="btn btn-primary" >Edit Package</button>
      </form>
    </div>
  )
}

export default EditPackage
