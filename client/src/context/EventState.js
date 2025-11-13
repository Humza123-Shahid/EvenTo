import EventContext from "./eventContext";
import { useState, useEffect  } from "react";

const EventState=(props)=>{
  const host="http://localhost:5000"
  const eventsInitial=[]

    const [events,setEvents]=useState(eventsInitial)

    const getEvents=async ()=>{
      const response=await fetch(`${host}/api/event/fetchallevents`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setEvents(json)
    }
    const addEvent=async (organizer,eventName,description,category,venue,eventDate,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/event/addevent`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({organizer,eventName,description,category,venue,eventDate,status})
      });
      const event=await response.json();
      const normalizedData = Array.isArray(event.savedEvent) ? event.savedEvent : [event.savedEvent];
      //setBuses(buses.concat(bus.savedBus));
      setEvents(prevEvents => [...prevEvents, normalizedData])
      return event.success;
    }
    const deleteEvent= async(id)=>{
      const response=await fetch(`${host}/api/event/deleteevent/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newEvents=events.filter((event)=>{return event._id!==id})
      setEvents(newEvents)
    }
    const editEvent=async(id,organizer,eventName,description,category,venue,eventDate,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/event/updateevent/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({organizer,eventName,description,category,venue,eventDate,status})
      });
      const json=response.json();
      let newEvents=JSON.parse(JSON.stringify(events));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newEvents.length; index++) {
        const element = newEvents[index];
        if(element._id===id)
        {
          newEvents[index].organizer=organizer;
          newEvents[index].eventName=eventName;
          newEvents[index].description=description;
          newEvents[index].category=category;
          newEvents[index].venue=venue;
          newEvents[index].eventDate=eventDate;
          newEvents[index].status=status;
          break;
        }
      }

      let a=0
      setEvents(newEvents);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <EventContext.Provider value={{events,addEvent,deleteEvent,editEvent,getEvents}}>
            {props.children}
        </EventContext.Provider>
    )
}
export default EventState;