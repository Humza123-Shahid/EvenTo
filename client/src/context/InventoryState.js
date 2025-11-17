import InventoryContext from "./inventoryContext";
import { useState, useEffect  } from "react";

const InventoryState=(props)=>{
  const host="http://localhost:5000"
  const inventoriesInitial=[]

    const [inventories,setInventories]=useState(inventoriesInitial)

    const getInventories=async ()=>{
      const response=await fetch(`${host}/api/inventory/fetchallinventories`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setInventories(json)
    }
    const addInventory=async (name,category,rentalPrice,availableQuantity,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/inventory/addinventory`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

        },
        body:JSON.stringify({name,category,rentalPrice,availableQuantity,status})
      });
      const inventory=await response.json();
      const normalizedData = Array.isArray(inventory.savedInventory) ? inventory.savedInventory : [inventory.savedInventory];
      
      setInventories(prevInventories => [...prevInventories, normalizedData])
      return inventory.success;
    }
    const deleteInventory= async(id)=>{
      const response=await fetch(`${host}/api/inventory/deleteinventory/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newInventories=inventories.filter((inventory)=>{return inventory._id!==id})
      setInventories(newInventories)
    }
    const editInventory=async(id,name,category,rentalPrice,availableQuantity,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/inventory/updateinventory/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,category,rentalPrice,availableQuantity,status})
      });
      const json=response.json();
      let newInventories=JSON.parse(JSON.stringify(inventories));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newInventories.length; index++) {
        const element = newInventories[index];
        if(element._id===id)
        {
          newInventories[index].name=name;
          newInventories[index].category=category;
          newInventories[index].rentalPrice=rentalPrice;
          newInventories[index].availableQuantity=availableQuantity;
          newInventories[index].status=status;
          break;
        }
      }

      let a=0
      setInventories(newInventories);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <InventoryContext.Provider value={{inventories,addInventory,deleteInventory,editInventory,getInventories}}>
            {props.children}
        </InventoryContext.Provider>
    )
}
export default InventoryState;