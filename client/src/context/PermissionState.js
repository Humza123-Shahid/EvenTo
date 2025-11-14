import PermissionContext from "./permissionContext";
import { useState, useEffect  } from "react";

const PermissionState=(props)=>{
  const host="http://localhost:5000"
  const permissionsInitial=[]

    const [permissions,setPermissions]=useState(permissionsInitial)

    const getPermissions=async ()=>{
      const response=await fetch(`${host}/api/permission/fetchallpermissions`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setPermissions(json)
    }
    const addPermission=async (permission)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/permission/addpermission`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({permission})
      });
      const permission2=await response.json();
      const normalizedData = Array.isArray(permission2.savedPermission) ? permission2.savedPermission : [permission2.savedPermission];
      //setBuses(buses.concat(bus.savedBus));
      setPermissions(prevPermissions => [...prevPermissions, normalizedData])
      return permission2.success;
    }
    const editPermission=async(id,permission)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/permission/updatepermission/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({permission})
      });
      const json=await response.json();
      let newPermissions=JSON.parse(JSON.stringify(permissions));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newPermissions.length; index++) {
        const element = newPermissions[index];
        if(element._id===id)
        {
          newPermissions[index].permission=permission;
          break;
        }
      }

      let a=0
      setPermissions(newPermissions);
      return json;
    }
  const deletePermission= async(id)=>{
      const response=await fetch(`${host}/api/permission/deletepermission/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newPermissions=permissions.filter((permission)=>{return permission._id!==id})
      setPermissions(newPermissions)
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <PermissionContext.Provider value={{permissions,addPermission,getPermissions,editPermission,deletePermission}}>
            {props.children}
        </PermissionContext.Provider>
    )
}
export default PermissionState;