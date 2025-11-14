
import React,{useState,useContext,useEffect} from 'react'
import { useLocation } from 'react-router-dom';

import expenceContext from '../context/expenceContext'
import eventContext from '../context/eventContext'

import InfoMessage from '../components/InfoMessage';

const EditExpence = () => {
    const context=useContext(expenceContext);
    const {editExpence}=context;
    const context2=useContext(eventContext);
      const {events,getEvents}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
             const location = useLocation();
        const Expence=location.state?.expence || {};
     const Events=location.state?.event || {};
    //  dateObject.setHours(dateObject.getHours() - 5);
    const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };

        const [amount, setAmount] = useState(Expence.amount);
    const [category, setCategory] = useState(Expence.category);
    const [description, setDescription] = useState(Expence.description);
    const [selectedEventValue, setSelectedEventValue] = useState(Events._id);
    const [date, setDate] =useState(formatDate(new Date(Expence.date)))

  const handleAmountChange = (e) => {
    setAmount(e.target.value); // <-- Get input value here
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // <-- Get input value here
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // <-- Get input value here
  };
  const handleChangeEvent = (event) => {
    setSelectedEventValue(event.target.value); 
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
    // const newTime = `${event.target.value}T05:00:00`
    // setDate2(newTime);
  };
  const editExpences=async (e)=>{
          e.preventDefault();
          const success= await editExpence(Expence._id,selectedEventValue,category,amount,description,date)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Expence updated successfully")
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
    <form onSubmit={editExpences}>

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
            <label htmlFor="category" className="form-label">Enter Category:</label>
            <input type="text" className="form-control" id="category" value={category} name="category" onChange={handleCategoryChange} />
      </div>
    
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="amount" className="form-label">Amount</label>
        <input type="number" className="form-control" id="amount" value={amount} name="amount" onChange={handleAmountChange} />
    </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="description" className="form-label">Description:</label>
            <input type="text" className="form-control" id="description" value={description} name="description" onChange={handleDescriptionChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="date" className="form-label">Date:</label>
      <input type="date" className="form-control" id="date" value={date} name="date" onChange={handleDateChange} />

      </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      </div>
      <button disabled={category.length<1||description.length<1||selectedEventValue==''} type="submit" className="btn btn-primary" >Edit Expence</button>
      </form>
    </div>
  )
}

export default EditExpence
