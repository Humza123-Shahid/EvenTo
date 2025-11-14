import AssignmentContext from "./assignmentContext";
import { useState, useEffect  } from "react";

const AssignmentState=(props)=>{
  const host="http://localhost:5000"
  const assignmentsInitial=[]

    const [assignments,setAssignments]=useState([])

    const getAssignments=async ()=>{
      const response=await fetch(`${host}/api/assignment/fetchallassignments`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setAssignments(json)
    }
    const addAssignment=async (allStaff,event_id,shift_start,shift_end)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      console.log(allStaff);
      const response=await fetch(`${host}/api/assignment/addassignment`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        // body:JSON.stringify({staff_id,event_id,role_id,shift_start,shift_end})
        body:JSON.stringify({allStaff,event_id,shift_start,shift_end})

      });
      const assignment=await response.json();
    //   console.log(assignment);
    //   const normalizedData = Array.isArray(assignment.data) ? assignment.data : [assignment.data];
    //   //setBuses(buses.concat(bus.savedBus));
    //  // console.log(normalizedData);
    //   setAssignments(prevAssignments => [...prevAssignments,normalizedData ])
      // setAssignments(preAssignments => {
      //         console.log('Type of preAssignments:', typeof preAssignments);
      //         console.log('Value of preAssignments:', preAssignments);
      //         return [...preAssignments, assignment.data]; 
      // })
      //setAssignments(prevAssignments => prevAssignments.concat(normalizedData))

      return assignment.success;
    }
    const deleteAssignment= async(id)=>{
      const response=await fetch(`${host}/api/assignment/deleteassignment/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newAssignments=assignments.filter((assignment)=>{return assignment._id!==id})
      setAssignments(newAssignments)
    }
    const editAssignment=async(id,event_id,shift_start,shift_end)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/assignment/updateassignment/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({event_id,shift_start,shift_end})
      });
      const json=await response.json();
      let newAssignments=JSON.parse(JSON.stringify(assignments));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newAssignments.length; index++) {
        const element = newAssignments[index];
        if(element._id===id)
        {
          newAssignments[index].event_id=event_id;
          newAssignments[index].shift_start=shift_start;
          newAssignments[index].shift_end=shift_end;
          break;
        }
      }

      let a=0
      setAssignments(newAssignments);
      //console.log(json.success);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <AssignmentContext.Provider value={{assignments,addAssignment,deleteAssignment,editAssignment,getAssignments}}>
            {props.children}
        </AssignmentContext.Provider>
    )
}
export default AssignmentState;