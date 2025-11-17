
import React,{useState,useEffect,useContext} from 'react'
import menuContext from '../context/menuContext'
//import driverContext from '../context/driverContext'
import InfoMessage from '../components/InfoMessage';

const AddMenu = () => {
    const context=useContext(menuContext);
    const {addMenu}=context;
    // const context2=useContext(driverContext);
    // const {drivers,getDrivers}=context2;
    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [menuType, setMenuType] = useState('');

    const [pricePerPerson, setPricePerPerson] = useState('');
    const [description, setDescription] = useState('');


    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleMenuTypeChange = (e) => {
    setMenuType(e.target.value); // <-- Get input value here
  };
  
    const handlePricePerPersonChange = (e) => {
    setPricePerPerson(e.target.value); // <-- Get input value here
  };
  
    const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // <-- Get input value here
  };
  const addMenus=(e)=>{
         e.preventDefault();
          const success=addMenu(name,menuType,pricePerPerson,description)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Menu added successfully")
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
    <form onSubmit={addMenus}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Name:</label>
            <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
      </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="mtype" className="form-label">Enter Type:</label>
            <input type="text" className="form-control" id="mtype" value={menuType} name="mtype" onChange={handleMenuTypeChange} />
      </div>
    
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="price" className="form-label">Enter Price:</label>
            <input type="number" className="form-control" id="price" value={pricePerPerson} name="price" onChange={handlePricePerPersonChange} />
      </div>
      </div>
      <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="description" className="form-label">Enter Description:</label>
            <input type="text" className="form-control" id="description" value={description} name="description" onChange={handleDescriptionChange} />
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
      <button disabled={pricePerPerson.length<1|| description.length<1||name==''||menuType==''} type="submit" className="btn btn-primary">Add Menu</button>
      </form>
    </div>
  )
}

export default AddMenu
