import React, { useState,useEffect,useRef , useContext} from "react";
import eventContext from '../context/eventContext'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Dashboard = () => {
     const context2=useContext(eventContext);
        const {events,getEvents}=context2;
  const calendarRef = useRef(null);
    const [myEvents, setMyEvents] = useState([]);

//   const events = [
//     { title: "Meeting", date: "2025-01-12" },
//     { title: "Conference", start: "2025-01-18", end: "2025-01-20" },
//   ];

  const changeView = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view); // ← Force view update
  };
   useEffect(() => {
      const fetchData = async () => {
            const result2 = await getEvents();
        //   const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
    
    }
      fetchData(); // Call the async function to fetch data
    }, []);
    function convertDateSlashesToDashes(dateString) {
  if (!dateString) return ''; // Handle empty or null input
  return dateString.replace(/\//g, '-');
}
       useEffect(() => {
      const fetchData = async () => {
        try {
        //   const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
        //   const data = await response.json();

          // Process the fetched data and extract desired attributes
          const processedItems = events.map((item) => {
            const dateObject = new Date(item.eventDate );
            //  dateObject.setHours(dateObject.getHours() - 5);
            // const formattedDate = dateObject.toLocaleString('en-US', {
            // year: 'numeric',
            // month: '2-digit',
            // day: '2-digit'
            // });
            const year = dateObject.getFullYear();
            const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Add 1 and pad with leading zero if needed
            const day = dateObject.getDate().toString().padStart(2, '0'); // Pad with leading zero if needed

            const formattedDate = `${year}-${month}-${day}`;
            //  formattedDate.replace(/\//g, '-');
        // Create a new object for the updated item
        return { title: item.eventName, // Example attribute
            date: formattedDate };
    
            // Example attribute
            // Add other desired attributes
          });
          console.log(processedItems);
          setMyEvents(processedItems); // Update the state with the new array
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData(); // Call the async function to fetch data
    }, [events]);

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => changeView("dayGridMonth")}>Month</button>
        <button onClick={() => changeView("timeGridWeek")}>Week</button>
        <button onClick={() => changeView("timeGridDay")}>Day</button>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={myEvents}
        height="650px"
      />
    </div>
  );
}

export default Dashboard
