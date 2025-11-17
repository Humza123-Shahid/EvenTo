
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import inventoryContext from '../context/inventoryContext'
//import driverContext from '../context/driverContext'
import InfoMessage from '../components/InfoMessage';

const EditInventory = () => {
    const context=useContext(inventoryContext);
    const {editInventory}=context;
    const location = useLocation();
    const Inventory=location.state?.inventory || {};

    // const context2=useContext(driverContext);
    // const {drivers,getDrivers}=context2;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type, setType] = useState('');
    const [name, setName] = useState(Inventory.name);
    const [category, setCategory] = useState(Inventory.category);

    const [rentalPrice, setRentalPrice] = useState(Inventory.rentalPrice);
    const [availableQuantity, setAvailableQuantity] = useState(Inventory.availableQuantity);
    const [status, setStatus] = useState(Inventory.status);


    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // <-- Get input value here
  };
  
    const handlePriceChange = (e) => {
    setRentalPrice(e.target.value); // <-- Get input value here
  };
  
    const handleAvailableQuantityChange = (e) => {
    setAvailableQuantity(e.target.value); // <-- Get input value here
  };
   const handleStatusChange = (e) => {
    setStatus(e.target.value); // <-- Get input value here
  };
  const editInventories=(e)=>{
         e.preventDefault();
          const success=editInventory(Inventory._id,name,category,rentalPrice,availableQuantity,status)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Inventory updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
    // useEffect(() => {
    //         const fetchData = async () => {
    //         //const result = await getQuizzes(); // Call context function
    //         const result = await getDrivers();
    //         //setMyData(result);                     // Set state in same file
    //       };
      
    //       fetchData();
    //       }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editInventories}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="category" className="form-label">Enter Category:</label>
            <input type="text" className="form-control" id="category" value={category} name="category" onChange={handleCategoryChange} />
      </div>
    
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="rprice" className="form-label">Enter Rental Price:</label>
            <input type="number" className="form-control" id="rprice" value={rentalPrice} name="rprice" onChange={handlePriceChange} />
      </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="quantity" className="form-label">Enter Available Quantity:</label>
            <input type="number" className="form-control" id="quantity" value={availableQuantity} name="quantity" onChange={handleAvailableQuantityChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="status" className="form-label">Enter Status:</label>
            <input type="text" className="form-control" id="status" value={status} name="status" onChange={handleStatusChange} />
      </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      </div>
      <button disabled={rentalPrice.length<1|| availableQuantity.length<1||name==''||category==''||status==''} type="submit" className="btn btn-primary">Edit Inventory</button>
      </form>
    </div>
  )
}

export default EditInventory
