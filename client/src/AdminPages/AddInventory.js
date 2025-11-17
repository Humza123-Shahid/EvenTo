
import React,{useState,useEffect,useContext} from 'react'
import inventoryContext from '../context/inventoryContext'
//import driverContext from '../context/driverContext'
import InfoMessage from '../components/InfoMessage';

const AddInventory = () => {
    const context=useContext(inventoryContext);
    const {addInventory}=context;
    // const context2=useContext(driverContext);
    // const {drivers,getDrivers}=context2;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const [rentalPrice, setRentalPrice] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');
    const [status, setStatus] = useState('');


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
  const addInventories=(e)=>{
         e.preventDefault();
          const success=addInventory(name,category,rentalPrice,availableQuantity,status)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Inventory added successfully")
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
    <form onSubmit={addInventories}>
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
      <button disabled={rentalPrice.length<1|| availableQuantity.length<1||name==''||category==''||status==''} type="submit" className="btn btn-primary">Add Inventory</button>
      </form>
    </div>
  )
}

export default AddInventory
