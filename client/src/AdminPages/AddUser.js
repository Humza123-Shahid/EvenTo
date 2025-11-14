
import React,{useState,useEffect,useContext} from 'react'
import userContext from '../context/userContext'
import staffContext from '../context/staffContext'

import InfoMessage from '../components/InfoMessage';

const AddUser = () => {
   const [showToast,setShowToast]=useState(false)
       const [msg,setMsg]=useState('')
       const [type,setType]=useState('')
       const [roles,setRoles]=useState([]);
     const [credentials,setCredentials] =useState({name:"",email:"",phone:'',password:"",cpassword:"",roleId:""})
     const context=useContext(userContext);
    const {addUser}=context;
     const context2=useContext(staffContext);
    const {addStaff}=context2;
    const [isStaff, setIsStaff] = useState(false);
  const [selectedStatusValue, setSelectedStatusValue] = useState(true);
  const [selectedSalaryValue, setSelectedSalaryValue] = useState("");
    const [isVendor, setIsVendor] = useState(false);
  const [selectedServiceValue, setSelectedServiceValue] = useState("");
  const [selectedRatingValue, setSelectedRatingValue] = useState("");
   const [isWaiter, setIsWaiter] = useState(false);
    const [selectedExperienceValue, setSelectedExperienceValue] = useState("");
    const [isPhotographer, setIsPhotographer] = useState(false);
     const [selectedRateValue, setSelectedRateValue] = useState("");

  const handleStatusChange = (e) => {
    setSelectedStatusValue(e.target.value === 'true'); // <-- Get input value here
  };
   const handleSalaryChange = (e) => {
    setSelectedSalaryValue(e.target.value); // <-- Get input value here
  };
  const handleServiceChange = (e) => {
    setSelectedServiceValue(e.target.value); // <-- Get input value here
  };
   const handleRatingChange = (e) => {
    setSelectedRatingValue(e.target.value); // <-- Get input value here
  };
  const handleExperienceChange = (e) => {
    setSelectedExperienceValue(e.target.value); // <-- Get input value here
  };
   const handleRateChange = (e) => {
    setSelectedRateValue(e.target.value); // <-- Get input value here
  };
     const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
      if(e.target.name=='roleId')
      {
       const roleobj= getRoleById(e.target.value);
       if(roleobj?.name=='director'||roleobj?.name=='manager')
       {
        
        setIsVendor(false)
        setIsWaiter(false)
        setIsPhotographer(false)
          setIsStaff(true)       
       }
       else if(roleobj?.name=='vendor'){
        setIsStaff(false)
        setIsWaiter(false)
        setIsPhotographer(false)
        setIsVendor(true)
       }
        else if(roleobj?.name=='waiter'){
        setIsStaff(false)
        setIsPhotographer(false)
        setIsVendor(false)
        setIsWaiter(true)
       }
        else if(roleobj?.name=='photographer'){
        setIsStaff(false)
        setIsVendor(false)
        setIsWaiter(false)
        setIsPhotographer(true)
       }
       else{
        setIsStaff(false)
        setIsVendor(false)
        setIsWaiter(false)
        setIsPhotographer(false)
       }
      }
      
    }
     const getRoleById = (id) => roles?.find(d => d._id === id);
  const addUsers=async (e)=>{
         e.preventDefault();
        const {name,email,phone,password,cpassword,roleId}=credentials
        const roleobj= getRoleById(roleId);

        if(password!=cpassword)
        {
        setShowToast(true);
            setMsg("Passwords do not match")
            setType("error")
            setTimeout(()=>{
            setShowToast(false)
            },1500)
        //props.showAlert("Passwords do not match","danger")
        return;
        }
         
          const user=await addUser(name,email,password,phone,roleId)
          console.log(user)
          if(user.success)
          {
            if(roleobj?.name=='director'||roleobj?.name=='manager')
            {
              console.log(user._id)
              await addStaff(user.data._id,selectedSalaryValue,selectedStatusValue)
            }
            else if(roleobj?.name=='vendor'){
              //await addVendor(name,email,password,phone,roleId)
              const response=await fetch("http://localhost:5000/api/vendor/addvendor",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')
                    },
                    body:JSON.stringify({user_id:user.data._id,service_type:selectedServiceValue,rating:selectedRatingValue})
                  });
                  const json=await response.json()
            }
              else if(roleobj?.name=='waiter'){
              //await addWaiter(name,email,password,phone,roleId)
               const response=await fetch("http://localhost:5000/api/waiter/addwaiter",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')
                    },
                    body:JSON.stringify({user_id:user.data._id,experienceLevel:selectedExperienceValue,salary:selectedSalaryValue})
                  });
                  const json=await response.json()
            }
              else if(roleobj?.name=='photographer'){
              //await addPhotographer(name,email,password,phone,roleId)
               const response=await fetch("http://localhost:5000/api/photographer/addphotographer",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')
                    },
                    body:JSON.stringify({user_id:user.data._id,rate:selectedRateValue,availability_status:selectedStatusValue})
                  });
                  const json=await response.json()
            }
            console.log("abc");
            setShowToast(true);
            setMsg("User added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

useEffect(() => {
           const fetchData = async () => {
            const response=await fetch("http://localhost:5000/api/role/fetchallroles",{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                    },
                  });
                  const json=await response.json()
                  console.log(json);
                  setRoles(json)
          };
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addUsers}>
    <div className='mx-0' style={{display:'flex'}}>
     <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

        </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="phone" name="phone" onChange={onChange} aria-describedby="phoneHelp"/>
        </div>
    </div>
      <div className='mx-0' style={{display:'flex'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={3} required/>
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={3} required/>
        </div>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="role" className="form-label">Role</label>
            <select id="roleId" className="form-control " name="roleId" onChange={onChange}>
                {/* <option value="admin">Admin</option>
                <option value="organizer">Organizer</option> */}
              <option value="">-Role-</option>
                  {Array.isArray(roles) && roles.map((row) => (
                  <option value={row._id}>{row.name}</option>
                  ))}
            </select>
        </div>
    </div>
        <div className='mx-0' style={{display:isStaff?'flex':'none'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="number" className="form-control" id="salary" name="salary" value={selectedSalaryValue} onChange={handleSalaryChange}  aria-describedby="emailHelp"/>
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Status:</label>
      <select id="mySelect" className="form-control " value={selectedStatusValue} onChange={handleStatusChange}>
        <option value="true">Active</option>
        <option value="false">InActive</option>

      </select>
    </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div>
    <div className='mx-0' style={{display:isVendor?'flex':'none'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="service" className="form-label">Service Type</label>
          <input type="text" className="form-control" id="service" name="service" value={selectedServiceValue} onChange={handleServiceChange}  aria-describedby="emailHelp"/>
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="rating" className="form-label">Rating:</label>
      <input type="text" className="form-control" id="raing" name="rating" value={selectedRatingValue} onChange={handleRatingChange}  aria-describedby="emailHelp"/>
       
    </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div>
     <div className='mx-0' style={{display:isWaiter?'flex':'none'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="experience" className="form-label">Experience</label>
          <input type="text" className="form-control" id="experience" name="experience" value={selectedExperienceValue} onChange={handleExperienceChange}  aria-describedby="emailHelp"/>
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="number" className="form-control" id="salary" name="salary" value={selectedSalaryValue} onChange={handleSalaryChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div>
    <div className='mx-0' style={{display:isPhotographer?'flex':'none'}}>

       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="rate" className="form-label">Rate</label>
          <input type="number" className="form-control" id="rate" name="rate" value={selectedRateValue} onChange={handleRateChange}  aria-describedby="emailHelp"/>
        </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Status:</label>
      <select id="mySelect" className="form-control " value={selectedStatusValue} onChange={handleStatusChange}>
        <option value="true">Active</option>
        <option value="false">InActive</option>

      </select>
    </div>
    <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div>
      <button disabled={credentials.name.length<1||credentials.email.length<1||credentials.password.length<1||credentials.cpassword.length<1||credentials.phone.length<1||credentials.roleId==""||isStaff&&selectedSalaryValue==""||isVendor&&(selectedServiceValue==""||selectedRatingValue=="")||isWaiter&&(selectedExperienceValue==""||selectedSalaryValue=="")||isPhotographer&&selectedRateValue==""} type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  )
}

export default AddUser
