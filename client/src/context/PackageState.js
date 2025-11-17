import PackageContext from "./packageContext";
import { useState, useEffect  } from "react";

const PackageState=(props)=>{
  const host="http://localhost:5000"
  const packagesInitial=[]

    const [packages,setPackages]=useState(packagesInitial)

    const getPackages=async ()=>{
      const response=await fetch(`${host}/api/package/fetchallpackages`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

            }
      })
      const json=await response.json();
      console.log(json);
      setPackages(json)
    }
    const addPackage=async (EventID,PackageName,PackageType,Description,Price,AvailabilityStatus)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/package/addpackage`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({EventID,PackageName,PackageType,Description,Price,AvailabilityStatus})
      });
      const packages=await response.json();
      const normalizedData = Array.isArray(packages.savedPackage ) ? packages.savedPackage : [packages.savedPackage];
      //setBuses(buses.concat(bus.savedBus));
      setPackages(prevPackages => [...prevPackages, normalizedData])
      return packages.success;
    } 
    const deletePackage= async(id)=>{
      const response=await fetch(`${host}/api/package/deletepackage/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newPackages=packages.filter((pkg)=>{return pkg._id!==id})
      setPackages(newPackages)
    }
    const editPackage=async(id,EventID,PackageName,PackageType,Description,Price,AvailabilityStatus)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/package/updatepackage/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({EventID,PackageName,PackageType,Description,Price,AvailabilityStatus})
      });
      const json=await response.json();
      let newPackages=JSON.parse(JSON.stringify(packages));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newPackages.length; index++) {
        const element = newPackages[index];
        if(element._id===id)
        {
          newPackages[index].EventID=EventID;
          newPackages[index].PackageName=PackageName;
          newPackages[index].PackageType=PackageType;
          newPackages[index].Description=Description;
          newPackages[index].Price=Price;
          newPackages[index].AvailabilityStatus=AvailabilityStatus;
          break;
        }
      }

      let a=0
      setPackages(newPackages);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <PackageContext.Provider value={{packages,addPackage,deletePackage,editPackage,getPackages}}>
            {props.children}
        </PackageContext.Provider>
    )
}
export default PackageState;