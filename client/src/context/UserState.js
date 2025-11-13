import UserContext from "./userContext";
import { useState, useEffect  } from "react";

const UserState=(props)=>{
  const host="http://localhost:5000"
  const usersInitial=[]

    const [users,setUsers]=useState(usersInitial)

    const getUsers=async ()=>{
      const response=await fetch(`${host}/api/user/fetchallusers`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setUsers(json)
    }
    const addUser=async (fullName,email,password,phone,role_id)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/user/adduser`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({fullName,email,password,phone,role_id})
      });
      const user=await response.json();
      const normalizedData = Array.isArray(user.data) ? user.data : [user.data];
      //setBuses(buses.concat(bus.savedBus));
      setUsers(prevUsers => [...prevUsers, normalizedData])
      // return user.success;
      return user;

    }
    const deleteUser= async(id)=>{
      const response=await fetch(`${host}/api/user/deleteuser/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newUsers=users.filter((user)=>{return user._id!==id})
      setUsers(newUsers)
    }
    const editUser=async(id,fullName,email,password,phone,role_id)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/user/updateuser/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({fullName,email,password,phone,role_id})
      });
      const json=await response.json();
      let newUsers=JSON.parse(JSON.stringify(users));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newUsers.length; index++) {
        const element = newUsers[index];
        if(element._id===id)
        {
          newUsers[index].fullName=fullName;
          newUsers[index].email=email;
          newUsers[index].password=password;
          newUsers[index].phone=phone;
          newUsers[index].role_id=role_id;
          break;
        }
      }

      let a=0
      setUsers(newUsers);
      return json;
    }
    
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <UserContext.Provider value={{users,addUser,deleteUser,editUser,getUsers}}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;