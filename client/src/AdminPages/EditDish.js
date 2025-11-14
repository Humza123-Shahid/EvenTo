
import React,{useState,useContext,useEffect} from 'react'
import { useLocation } from 'react-router-dom';

import dishContext from '../context/dishContext'
// import eventContext from '../context/eventContext'

import InfoMessage from '../components/InfoMessage';

const EditDish = () => {
    const context=useContext(dishContext);
    const {editDish}=context;
    const location = useLocation();
    const Dish=location.state?.dish || {};
     const Menu=location.state?.menu || {};
    // const context2=useContext(eventContext);
    //   const {events,getEvents}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [menus, setMenus] = useState([]);
    const [name, setName] = useState(Dish.name);
    const [category, setCategory] = useState(Dish.category);
    const [cost, setCost] = useState(Dish.cost);
    const [selectedMenuValue, setSelectedMenuValue] = useState(Menu._id);
    const [ingredients, setIngredients] = useState(Dish.ingredients);

  const handleCostChange = (e) => {
    setCost(e.target.value); // <-- Get input value here
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value); // <-- Get input value here
  };
  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleChangeMenu = (event) => {
    setSelectedMenuValue(event.target.value); 
  };
  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };
  const editDishes=async (e)=>{
          e.preventDefault();
          const success= await editDish(Dish._id,name,category,cost,selectedMenuValue,ingredients)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Dish updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            //const result = await getDishes();
            const response=await fetch(`http://localhost:5000/api/menu/fetchallmenus`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')

                        }
                })
            const json=await response.json();
            
            setMenus(json)
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editDishes}>

    <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Name:</label>
            <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="category" className="form-label">Enter Category:</label>
            <input type="text" className="form-control" id="category" value={category} name="category" onChange={handleCategoryChange} />
      </div>
         <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="cost" className="form-label">Cost</label>
        <input type="number" className="form-control" id="cost" value={cost} name="cost" onChange={handleCostChange} />
    </div>

      </div>
      <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Menu Name:</label>
        <select id="mySelect" className="form-control "  value={selectedMenuValue} onChange={handleChangeMenu}>
            <option value="">-Select-</option>
            {menus.map((row) => (
            <option value={row._id}>{row.name}</option>
            ))}
        </select>        
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="ingredients" className="form-label">Ingredients:</label>
      <input type="text" className="form-control" id="ingredients" value={ingredients} name="ingredients" onChange={handleIngredientsChange} />

      </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      </div>
      <button disabled={category.length<1||name.length<1||ingredients.length<1||selectedMenuValue==''} type="submit" className="btn btn-primary" >Edit Dish</button>
      </form>
    </div>
  )
}

export default EditDish
