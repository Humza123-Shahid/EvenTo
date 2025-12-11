import React, { useMemo, useState,useEffect,useRef , useContext} from "react";
import eventContext from '../context/eventContext'
import paymentContext from '../context/paymentContext'
import bookingContext from '../context/bookingContext'
import expenceContext from '../context/expenceContext'
import { Bar } from 'react-chartjs-2';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer, 
  Cell
} from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartDataLabels
);


const COLORS = ["#0088FE", "#FF8042", "#FFBB28", "#00C49F"];

const Dashboard = () => {
     const context2=useContext(eventContext);
    const {events,getEvents}=context2;
    const context3=useContext(paymentContext);
    const {payments,getPayments}=context3;
    const context4=useContext(bookingContext);
    const {bookings,getBookings}=context4;
    const context5=useContext(expenceContext);
    const {expences,getExpences}=context5;
  const calendarRef = useRef(null);
    const [chartData, setChartData] = useState([]);
        const [chartData2, setChartData2] = useState([]);

    const [myEvents, setMyEvents] = useState([]);
     const [pieData,setPieData] = useState([]);
           const [pieColor,setPieColor] = useState([]);
            const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 70],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86,56],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
//     const CustomPieTooltip = ({ active, payload }) => {
//           console.log(payload)

//   if (active && payload && payload.length) {
//     console.log(payload)
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${payload[0].label}: ${payload[0].difference}`}</p>
//         {/* <p className="intro">{`Percentage:${payload[0].percent}%`}</p> */}
//       </div>
//     );
//   }
//   return null;
// };
const CustomPieTooltip = ({ active, payload }) => {
  console.log(payload);
  if (active && payload && payload.length) {
    const data = payload[0].payload; // actual data object of the slice
      console.log(payload[0].payload);

    return (
      <div style={{ background: "#fff", border: "1px solid #ccc", padding: "5px" }}>
        <p>Booking: {data.label}</p>
        <p>Profit: {data.difference}</p>
      </div>
    );
  }

  return null;
};
// const pieChartData = [
//   {
//     name: "Apples",
//     value: 35,
//     color: "#FF6384"
//   },
//   {
//     name: "Bananas",
//     value: 25,
//     color: "#36A2EB"
//   },
//   {
//     name: "Cherries",
//     value: 25,
//     color: "#FFCE56"
//   },
//   {
//     name: "Dates",
//     value: 15,
//     color: "#4BC0C0"
//   }
// ];
//   const events = [
//     { title: "Meeting", date: "2025-01-12" },
//     { title: "Conference", start: "2025-01-18", end: "2025-01-20" },
//   ];

  const changeView = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view); // ← Force view update
  };
  
  function groupAndSum(arr, key, valueKey) {
  return arr.reduce((acc, item) => {
    if (!acc[item[key]]) acc[item[key]] = 0;
    acc[item[key]] += Number(item[valueKey]);
    return acc;
  }, {});
}

// Extract label mapping
function extractLabelMap(tableA, idKey, labelKey) {
  const labelMap = {};
  tableA.forEach(item => {
    if (!labelMap[item[idKey]]) {
      const dateObject = new Date(item[labelKey]);
    //  dateObject.setHours(dateObject.getHours() - 5);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
      // hour: 'numeric',
      // minute: 'numeric',
      // hour12: true // Ensures AM/PM
    });
      labelMap[item[idKey]] = formattedDate;  // store first label found
    }
  });
  return labelMap;
}

  // const getBookingsById = (id) => bookings.find(d => d.event === id);
    const getBookingsById = (id)=>bookings.filter(book => book.event == id);
    const getBookingsById2 = (id)=>bookings.filter(book => book._id == id);
    const getBookingsById3 = (id)=>bookings.filter(book => book._id == id);
    const getEventsById = (id)=>events.filter(event => event._id == id);
    // const getEventsById2 = (id)=>events.filter(event => event._id == id);

    useEffect(() => {
    const fetchData = async () => {
      const eventArray=[]
       for (const py of payments) {
        //  const newData = { user: booking.name, event: booking.event,quantity:booking.quantity,totalAmount:booking.totalAmount,bookingDate:booking.bookingDate,status:booking.status };
          const book=await getBookingsById3(py.booking);
          console.log(book);
          for(const bk of book)
          {
            const event=await getEventsById(bk.event);
          console.log(event);
          for (const ev of event) {
          const obj1 = ev;
                const combined = {
            ...obj1,
            amount: py.amount// new field
          };

          eventArray.push(combined);
          }
          
        }
      }
        console.log(eventArray);
        const eventArray2=[]
            // Step 1: Sums
      for (const exp of expences) {
        //  const newData = { user: booking.name, event: booking.event,quantity:booking.quantity,totalAmount:booking.totalAmount,bookingDate:booking.bookingDate,status:booking.status };
        
          const expence=await getEventsById(exp.event);
          console.log(expence);
          for (const ep of expence) {
          const obj1 = ep;
                const combined = {
            ...obj1
          };

          eventArray2.push(combined);
        }
        // for (const pay of payments) {
        //   if(pay.booking==booking)
        //   {
        //     const profit=pay.amount-exp.amount;
        //   }
      }
      const tableASum = await groupAndSum(expences, "event", "amount");
      const tableBSum = await groupAndSum(eventArray, "_id", "amount");
        console.log(tableASum)
 console.log(tableBSum)
      // Step 2: Labels
      const labelMap = extractLabelMap(eventArray, "_id", "eventDate");
      const labelMap2 = extractLabelMap(eventArray2, "_id", "eventDate");
 console.log(labelMap)

      // Step 3: Final result with labels
      // const differences = Object.keys(tableBSum).filter(key => tableASum.hasOwnProperty(key)).map((id) => ({
       
      //   bookingId: id,
      //   label: labelMap[id] || "Unknown",
      //   tableAValue: tableASum[id],
      //   tableBValue: tableBSum[id] || 0,
      //   difference: tableASum[id] - (tableBSum[id] || 0)
        
      // }));
       const differences = Object.keys(tableBSum).map((id) => ({
       
        bookingId: id,
        label: labelMap[id] || "Unknown",
        tableAValue: tableASum[id] || 0,
        tableBValue: tableBSum[id],
        difference: (tableASum[id] || 0) - tableBSum[id]
        
      }));
      const differences2 = Object.keys(tableASum).filter(key => !tableBSum.hasOwnProperty(key)).map((id) => ({
       
        bookingId: id,
        label: labelMap2[id] || "Unknown",
        tableAValue: tableASum[id],
        tableBValue: tableBSum[id] || 0,
        difference: tableASum[id] - (tableBSum[id] || 0)
        
      }));
      console.log(differences);
      // console.log(differences2);
      const combinedResults = differences.concat(differences2);
      console.log(combinedResults);

      const chartArray =[{
        
        labels:combinedResults.map(dif => dif.label),
        datasets: [
          {
            label: 'Expences',
            // data: differences.tableAValue,
            data: combinedResults.map(dif => dif.tableAValue),
            backgroundColor: 'rgba(255,0,0, 0.6)',
            borderColor: 'rgba(255,0,0, 1)',
            borderWidth: 1,
          },
          {
            label: 'Payments',
            data: combinedResults.map(dif => dif.tableBValue),
            backgroundColor: 'rgba(0,255,0, 0.6)',
            borderColor: 'rgba(0,255,0, 1)',
            borderWidth: 1,
          },
        ],
      
      }]
      console.log(chartArray);
       const visibleCharts = chartArray.filter(chart =>
          chart.datasets.some(ds => ds.data.some(value => value !== 0))
        );
        console.log(visibleCharts)
        if(visibleCharts.length!=0)
        {
          setChartData(prevchartData => [...prevchartData, visibleCharts]);
        }
    }
      fetchData();
  },[bookings,payments,expences,events]);
//   const barChartData = useMemo(() => {
//   return chartData;
// }, [chartData]);
// useEffect(() => {
//     if (chartData && Array.isArray(chartData)) {
//       console.log(chartData);
//       const firstObject = chartData[0];
//       console.log(firstObject);
//       // Create a new array with the first object at the beginning,
//       // followed by all existing elements in myStateArray.
//       setChartData2([firstObject, ...chartData2]);
//         //setChartData2(chartData[0]);

//     } else {
//       // Optionally, handle cases where it's not an array or doesn't exist
//       // For example, you might want to reset the state or set a default value
//       setChartData2([]);
//     }
// },[chartData])
// useEffect(() => {
//     console.log(chartData2)
// },[chartData2])
   useEffect(() => {
    const fetchData = async () => {
      const bookingArray=[]
       for (const exp of expences) {
        //  const newData = { user: booking.name, event: booking.event,quantity:booking.quantity,totalAmount:booking.totalAmount,bookingDate:booking.bookingDate,status:booking.status };
        
          const booking=await getBookingsById(exp.event);
          console.log(booking);
          for (const book of booking) {
          const obj1 = book;
                const combined = {
            ...obj1,
            amount: exp.amount// new field
          };

          bookingArray.push(combined);
        }
      }
        console.log(bookingArray);
        const bookingArray2=[]
            // Step 1: Sums
      for (const py of payments) {
        //  const newData = { user: booking.name, event: booking.event,quantity:booking.quantity,totalAmount:booking.totalAmount,bookingDate:booking.bookingDate,status:booking.status };
        
          const payment=await getBookingsById2(py.booking);
          console.log(payment);
          for (const pym of payment) {
          const obj1 = pym;
                const combined = {
            ...obj1
          };

          bookingArray2.push(combined);
        }
        // for (const pay of payments) {
        //   if(pay.booking==booking)
        //   {
        //     const profit=pay.amount-exp.amount;
        //   }
      }
      const tableASum = await groupAndSum(payments, "booking", "amount");
      const tableBSum = await groupAndSum(bookingArray, "_id", "amount");
        console.log(tableASum)
 console.log(tableBSum)
      // Step 2: Labels
      const labelMap = extractLabelMap(bookingArray2, "_id", "bookingDate");
 console.log(labelMap)

      // Step 3: Final result with labels
      const differences = Object.keys(tableASum).map((id) => ({
        bookingId: id,
        label: labelMap[id] || "Unknown",
        tableAValue: tableASum[id],
        tableBValue: tableBSum[id] || 0,
        difference: tableASum[id] - (tableBSum[id] || 0),
      }));
      setPieData(differences);
    
    }

      fetchData();
  },[bookings,payments,expences]);
   useEffect(() => {
      const fetchData = async () => {
            const result2 = await getEvents();
        //   const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
      const result3=await getBookings();
      const result4=await getExpences();
      const result5=await getPayments();
      
      // const bookingArray=[]
            // Step 1: Sums
//       for (const exp of expences) {
//         //  const newData = { user: booking.name, event: booking.event,quantity:booking.quantity,totalAmount:booking.totalAmount,bookingDate:booking.bookingDate,status:booking.status };
        
//           const booking=await getBookingsById(exp.event);
//           console.log(booking);
//           for (const book of booking) {
//           const obj1 = book;
//                 const combined = {
//             ...obj1,
//             amount: exp.amount// new field
//           };

//           bookingArray.push(combined);
//         }
//         console.log(bookingArray);
//         const bookingArray2=[]
//             // Step 1: Sums
//       for (const py of payments) {
//         //  const newData = { user: booking.name, event: booking.event,quantity:booking.quantity,totalAmount:booking.totalAmount,bookingDate:booking.bookingDate,status:booking.status };
        
//           const payment=await getBookingsById2(py.booking);
//           console.log(payment);
//           for (const pym of payment) {
//           const obj1 = pym;
//                 const combined = {
//             ...obj1
//           };

//           bookingArray2.push(combined);
//         }
//         // for (const pay of payments) {
//         //   if(pay.booking==booking)
//         //   {
//         //     const profit=pay.amount-exp.amount;
//         //   }
//       }
//       const tableASum = groupAndSum(payments, "booking", "amount");
//       const tableBSum = groupAndSum(bookingArray, "_id", "amount");
//         console.log(tableASum)
//  console.log(tableBSum)
//       // Step 2: Labels
//       const labelMap = extractLabelMap(bookingArray2, "_id", "bookingDate");
//  console.log(labelMap)

//       // Step 3: Final result with labels
//       const differences = Object.keys(tableASum).map((id) => ({
//         bookingId: id,
//         label: labelMap[id] || "Unknown",
//         tableAValue: tableASum[id],
//         tableBValue: tableBSum[id] || 0,
//         difference: tableASum[id] - (tableBSum[id] || 0),
//       }));
//       setPieData(differences);
//     }
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
    const generateColors = (length) => {
  return Array.from({ length }, (_, i) => `hsl(${(i * 360) / length}, 70%, 50%)`);
};
       useEffect(() => {
        const colors = generateColors(pieData.length);
        setPieColor(colors);
       },[pieData])
// useEffect(() => {
//    const container = document.getElementById("barChartContainer");
//    if (container) container.innerHTML = "";  // clears old chart
// }, []);
  return (
    <div style={{ margin: "20px" }}>
      <div style={{ width: '100%'}}>
      <h2 className="pb-3">Cash Movement Over Time</h2>
      {chartData.length === 0 && <p>No charts with data available.</p>}
      {chartData.map((chart, index) => (
        index === 0 ? (
        chart.map((cha)=>(
          <div key={index} style={{ marginBottom: "30px" }} id="barChartContainer">
          <Bar
            data={cha}
          />
        </div>
        )
      )):null
      ))}
       
      
      
    </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 500 }}>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          
          <Pie
             data={pieData}
            dataKey="difference"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill="#8884d8"
            label
          >
            {/* Map colors from data */}
            {pieData.map((entry, index) => (
              <Cell  key={index}
            // fill={COLORS[index % COLORS.length]}
            fill={pieColor[index]} 
            />
            ))}
          </Pie>
          
          {/* 🎯 Tooltip for the Pie Chart */}
          <Tooltip content={<CustomPieTooltip />} /> 
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    </div>
    <div style={{ marginTop: "40px" }}>
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
