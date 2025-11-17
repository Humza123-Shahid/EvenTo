import MenuContext from "./menuContext";
import { useState, useEffect  } from "react";

const MenuState=(props)=>{
  const host="http://localhost:5000"
  const menusInitial=[]

    const [menus,setMenus]=useState(menusInitial)

    const getMenus=async ()=>{
      const response=await fetch(`${host}/api/menu/fetchallmenus`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setMenus(json)
    }
    const addMenu=async (name,type,pricePerPerson,description)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/menu/addmenu`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,type,pricePerPerson,description})
      });
      const menus=await response.json();
      const normalizedData = Array.isArray(menus.savedMenu ) ? menus.savedMenu : [menus.savedMenu];
      //setBuses(buses.concat(bus.savedBus));
      setMenus(prevMenus => [...prevMenus, normalizedData])
      return menus.success;
    } 
    const deleteMenu= async(id)=>{
      const response=await fetch(`${host}/api/menu/deletemenu/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newMenus=menus.filter((menu)=>{return menu._id!==id})
      setMenus(newMenus)
    }
    const editMenu=async(id,name,type,pricePerPerson,description)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/menu/updatemenu/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,type,pricePerPerson,description})
      });
      const json=await response.json();
      let newMenus=JSON.parse(JSON.stringify(menus));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newMenus.length; index++) {
        const element = newMenus[index];
        if(element._id===id)
        {
          newMenus[index].name=name;
          newMenus[index].type=type;
          newMenus[index].pricePerPerson=pricePerPerson;
          newMenus[index].description=description;
          break;
        }
      }

      let a=0
      setMenus(newMenus);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <MenuContext.Provider value={{menus,addMenu,deleteMenu,editMenu,getMenus}}>
            {props.children}
        </MenuContext.Provider>
    )
}
export default MenuState;