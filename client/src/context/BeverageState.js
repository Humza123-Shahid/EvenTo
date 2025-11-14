import BeverageContext from "./beverageContext";
import { useState, useEffect  } from "react";

const BeverageState=(props)=>{
  const host="http://localhost:5000"
  const beveragesInitial=[]

    const [beverages,setBeverages]=useState(beveragesInitial)

    const getBeverages=async ()=>{
      const response=await fetch(`${host}/api/beverage/fetchallbeverages`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setBeverages(json)
    }
    const addBeverage=async (name,type,price,availableQuantity)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/beverage/addbeverage`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

        },
        body:JSON.stringify({name,type,price,availableQuantity})
      });
      const beverage=await response.json();
      const normalizedData = Array.isArray(beverage.savedBeverage) ? beverage.savedBeverage : [beverage.savedBeverage];
      
      setBeverages(prevBeverages => [...prevBeverages, normalizedData])
      return beverage.success;
    }
    const deleteBeverage= async(id)=>{
      const response=await fetch(`${host}/api/beverage/deletebeverage/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newBeverages=beverages.filter((beverage)=>{return beverage._id!==id})
      setBeverages(newBeverages)
    }
    const editBeverage=async(id,name,type,price,availableQuantity)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/beverage/updatebeverage/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,type,price,availableQuantity})
      });
      const json=response.json();
      let newBeverages=JSON.parse(JSON.stringify(beverages));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newBeverages.length; index++) {
        const element = newBeverages[index];
        if(element._id===id)
        {
          newBeverages[index].name=name;
          newBeverages[index].type=type;
          newBeverages[index].price=price;
          newBeverages[index].availableQuantity=availableQuantity;
          break;
        }
      }

      let a=0
      setBeverages(newBeverages);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <BeverageContext.Provider value={{beverages,addBeverage,deleteBeverage,editBeverage,getBeverages}}>
            {props.children}
        </BeverageContext.Provider>
    )
}
export default BeverageState;