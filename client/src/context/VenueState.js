import VenueContext from "./venueContext";
import { useState, useEffect  } from "react";

const VenueState=(props)=>{
  const host="http://localhost:5000"
  const venuesInitial=[]

    const [venues,setVenues]=useState(venuesInitial)

    const getVenues=async ()=>{
      const response=await fetch(`${host}/api/venue/fetchallvenues`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setVenues(json)
    }
    const addVenue=async (venueName,address,city,capacity,contactPerson,contactPhone)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/venue/addvenue`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({venueName,address,city,capacity,contactPerson,contactPhone})
      });
      const venues=await response.json();
      const normalizedData = Array.isArray(venues.savedVenue ) ? venues.savedVenue : [venues.savedVenue];
      //setBuses(buses.concat(bus.savedBus));
      setVenues(prevVenues => [...prevVenues, normalizedData])
      return venues.success;
    } 
    const deleteVenue= async(id)=>{
      const response=await fetch(`${host}/api/venue/deletevenue/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newVenues=venues.filter((venue)=>{return venue._id!==id})
      setVenues(newVenues)
    }
    const editVenue=async(id,venueName,address,city,capacity,contactPerson,contactPhone)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/venue/updatevenue/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({venueName,address,city,capacity,contactPerson,contactPhone})
      });
      const json=await response.json();
      let newVenues=JSON.parse(JSON.stringify(venues));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newVenues.length; index++) {
        const element = newVenues[index];
        if(element._id===id)
        {
          newVenues[index].venueName=venueName;
          newVenues[index].address=address;
          newVenues[index].city=city;
          newVenues[index].capacity=capacity;
          newVenues[index].contactPerson=contactPerson;
          newVenues[index].contactPhone=contactPhone;
          break;
        }
      }

      let a=0
      setVenues(newVenues);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <VenueContext.Provider value={{venues,addVenue,deleteVenue,editVenue,getVenues}}>
            {props.children}
        </VenueContext.Provider>
    )
}
export default VenueState;