
import React,{useState,useContext,useEffect} from 'react'
import venueContext from '../context/venueContext'
import InfoMessage from '../components/InfoMessage';

const AddVenue = () => {
    const context=useContext(venueContext);
    const {addVenue}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [person, setPerson] = useState('');
    const [phone, setPhone] = useState('');
    
  const handleCapacityChange = (e) => {
    setCapacity(e.target.value); // <-- Get input value here
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value); // <-- Get input value here
  };
  const handleCityChange = (e) => {
    setCity(e.target.value); // <-- Get input value here
  };
  const handlePersonChange = (e) => {
    setPerson(e.target.value); // <-- Get input value here
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value); // <-- Get input value here
  };
  const addVenues=async (e)=>{
    console.log("abc");
          e.preventDefault();
          const success= await addVenue(name,address,city,capacity,person,phone)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Venue added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addVenues}>

    <div className='mx-0' style={{display:'flex'}}>
   
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="vname" className="form-label">Enter Venue Name:</label>
            <input type="text" className="form-control" id="vname" value={name} name="vname" onChange={handleNameChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="address" className="form-label">Enter Address:</label>
            <input type="text" className="form-control" id="address" value={address} name="address" onChange={handleAddressChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="city" className="form-label">Enter City:</label>
            <input type="text" className="form-control" id="city" value={city} name="city" onChange={handleCityChange} />
      </div>
        
      </div>
      <div className='mx-0' style={{display:'flex'}}>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="capacity" className="form-label">Enter Capacity:</label>
        <input type="number" className="form-control" id="capacity" value={capacity} name="capacity" onChange={handleCapacityChange} />
    </div>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="cperson" className="form-label">Contact Person:</label>
            <input type="text" className="form-control" id="cperson" value={person} name="cperson" onChange={handlePersonChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="cphone" className="form-label">Contact Phone:</label>
            <input type="text" className="form-control" id="cphone" value={phone} name="cphone" onChange={handlePhoneChange} />
      </div>
      </div>
      <button disabled={name.length<1||address.length<1||city.length<1||capacity.length<1||person.length<1||phone==''} type="submit" className="btn btn-primary" >Add Venue</button>
      </form>
    </div>
  )
}

export default AddVenue
