import ExpenceContext from "./expenceContext";
import { useState, useEffect  } from "react";

const ExpenceState=(props)=>{
  const host="http://localhost:5000"
  const expencesInitial=[]

    const [expences,setExpences]=useState(expencesInitial)

    const getExpences=async ()=>{
      const response=await fetch(`${host}/api/expence/fetchallexpences`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setExpences(json)
    }
    const addExpence=async (event,category,amount,description,date)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/expence/addexpence`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({event,category,amount,description,date})
      });
      const expences=await response.json();
      const normalizedData = Array.isArray(expences.savedExpence ) ? expences.savedExpence : [expences.savedExpence];
      //setBuses(buses.concat(bus.savedBus));
      setExpences(prevExpences => [...prevExpences, normalizedData])
      return expences.success;
    } 
    const deleteExpence= async(id)=>{
      const response=await fetch(`${host}/api/expence/deleteexpence/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newExpences=expences.filter((expence)=>{return expence._id!==id})
      setExpences(newExpences)
    }
    const editExpence=async(id,event,category,amount,description,date)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/expence/updateexpence/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({event,category,amount,description,date})
      });
      const json=await response.json();
      let newExpences=JSON.parse(JSON.stringify(expences));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newExpences.length; index++) {
        const element = newExpences[index];
        if(element._id===id)
        {
          newExpences[index].event=event;
          newExpences[index].category=category;
          newExpences[index].amount=amount;
          newExpences[index].description=description;
          newExpences[index].date=date;
          break;
        }
      }

      let a=0
      setExpences(newExpences);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <ExpenceContext.Provider value={{expences,addExpence,deleteExpence,editExpence,getExpences}}>
            {props.children}
        </ExpenceContext.Provider>
    )
}
export default ExpenceState;