import DishContext from "./dishContext";
import { useState, useEffect  } from "react";

const DishState=(props)=>{
  const host="http://localhost:5000"
  const dishesInitial=[]

    const [dishes,setDishes]=useState(dishesInitial)

    const getDishes=async ()=>{
      const response=await fetch(`${host}/api/dish/fetchalldishes`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setDishes(json)
    }
    const addDish=async (name,category,cost,menu_id,ingredients)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/dish/adddish`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,category,cost,menu_id,ingredients})
      });
      const dishes=await response.json();
      const normalizedData = Array.isArray(dishes.savedDish) ? dishes.savedDish : [dishes.savedDish];
      //setBuses(buses.concat(bus.savedBus));
      setDishes(prevDishes => [...prevDishes, normalizedData])
      return dishes.success;
    } 
    const deleteDish= async(id)=>{
      const response=await fetch(`${host}/api/dish/deletedish/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newDishes=dishes.filter((dish)=>{return dish._id!==id})
      setDishes(newDishes)
    }
    const editDish=async(id,name,category,cost,menu_id,ingredients)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/dish/updatedish/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,category,cost,menu_id,ingredients})
      });
      const json=await response.json();
      let newDishes=JSON.parse(JSON.stringify(dishes));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newDishes.length; index++) {
        const element = newDishes[index];
        if(element._id===id)
        {
          newDishes[index].name=name;
          newDishes[index].category=category;
          newDishes[index].cost=cost;
          newDishes[index].menu_id=menu_id;
          newDishes[index].ingredients=ingredients;
          break;
        }
      }

      let a=0
      setDishes(newDishes);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <DishContext.Provider value={{dishes,addDish,deleteDish,editDish,getDishes}}>
            {props.children}
        </DishContext.Provider>
    )
}
export default DishState;