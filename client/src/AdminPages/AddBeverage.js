
import React,{useState,useEffect,useContext} from 'react'
import beverageContext from '../context/beverageContext'
//import driverContext from '../context/driverContext'
import InfoMessage from '../components/InfoMessage';

const AddBeverage = () => {
    const context=useContext(beverageContext);
    const {addBeverage}=context;
    // const context2=useContext(driverContext);
    // const {drivers,getDrivers}=context2;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [beverageType, setBeverageType] = useState('');

    const [price, setPrice] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');


    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleBeverageTypeChange = (e) => {
    setBeverageType(e.target.value); // <-- Get input value here
  };
  
    const handlePriceChange = (e) => {
    setPrice(e.target.value); // <-- Get input value here
  };
  
    const handleAvailableQuantityChange = (e) => {
    setAvailableQuantity(e.target.value); // <-- Get input value here
  };
  const addBeverages=(e)=>{
         e.preventDefault();
          const success=addBeverage(name,beverageType,price,availableQuantity)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Beverage added successfully")
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
    <form onSubmit={addBeverages}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="btype" className="form-label">Enter Type:</label>
            <input type="text" className="form-control" id="btype" value={beverageType} name="btype" onChange={handleBeverageTypeChange} />
      </div>
    
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="price" className="form-label">Enter Price:</label>
            <input type="number" className="form-control" id="price" value={price} name="price" onChange={handlePriceChange} />
      </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="quantity" className="form-label">Enter Available Quantity:</label>
            <input type="number" className="form-control" id="quantity" value={availableQuantity} name="quantity" onChange={handleAvailableQuantityChange} />
      </div>
       <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      </div>
      <button disabled={price.length<1|| availableQuantity.length<1||name==''||beverageType==''} type="submit" className="btn btn-primary">Add Beverage</button>
      </form>
    </div>
  )
}

export default AddBeverage
