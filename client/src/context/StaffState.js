import StaffContext from "./staffContext";
import { useState, useEffect  } from "react";

const StaffState=(props)=>{
  const host="http://localhost:5000"
  const staffsInitial=[]

    const [staffs,setStaffs]=useState(staffsInitial)

    const getStaffs=async ()=>{
      const response=await fetch(`${host}/api/staff/fetchallstaffs`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setStaffs(json)
    }
    const addStaff=async (user_id,salary,availability_status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/staff/addstaff`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({user_id,salary,availability_status})
      });
      const staff=await response.json();
      const normalizedData = Array.isArray(staff.savedStaff) ? staff.Savedstaff : [staff.Savedstaff];
      //setBuses(buses.concat(bus.savedBus));
      setStaffs(prevStaffs => [...prevStaffs, normalizedData])
      return staff.success;
    }
     const editStaff=async(id,user_id,salary,availability_status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/staff/updatestaff/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({user_id,salary,availability_status})
      });
      const json=await response.json();
      let newStaffs=JSON.parse(JSON.stringify(staffs));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newStaffs.length; index++) {
        const element = newStaffs[index];
        if(element._id===id)
        {
          newStaffs[index].user_id=user_id;
          newStaffs[index].salary=salary;
          newStaffs[index].availability_status=availability_status;
          break;
        }
      }

      let a=0
      setStaffs(newStaffs);
      return json;
    }
  const deleteStaff= async(id)=>{
      const response=await fetch(`${host}/api/staff/deletestaff/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newStaffs=staffs.filter((staff)=>{return staff._id!==id})
      setStaffs(newStaffs)
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <StaffContext.Provider value={{staffs,addStaff,getStaffs,editStaff,deleteStaff}}>
            {props.children}
        </StaffContext.Provider>
    )
}
export default StaffState;