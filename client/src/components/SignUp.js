import React, { useState,useEffect,useRef,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logimg from '../images/userlogtransparent.png';
import InfoMessage from './InfoMessage';

//const Signup = (props) => {
const SignUp = (props) => {

    const [showToast,setShowToast]=useState(false)
    const [msg,setMsg]=useState('')
    const [type,setType]=useState('')
    const [roles,setRoles]=useState([]);
  const [credentials,setCredentials] =useState({name:"",email:"",phone_number:'',password:"",cpassword:"",roleId:""})
  

  let navigate=useNavigate();
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    const {name,email,phone_number,password,cpassword,roleId}=credentials

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
    const user="user";
    console.log(user,name,email,phone_number,password,roleId);
    const response=await fetch("http://localhost:5000/api/auth/registeruser",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,phone_number,password,roleId})
      });
      const json=await response.json()
      console.log(json);
      if(json.success)
      {
        
        
        localStorage.setItem('token',json.authtoken);
          localStorage.setItem('utype',"user");
           sessionStorage.setItem("reloaded", "false");
          navigate("/",{
          state: { signUpSuccess: true},
          replace: true, // optional: prevents back button returning to login
        });
        
      }
      else{
          setShowToast(true);
        setMsg("Invalid Credentials")
        setType("error")
        setTimeout(()=>{
          setShowToast(false)
        },1500)
        //props.showAlert("Invalid Details","danger")
    }
}
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
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
          }, []); //
        
  return (
    <div className='mt-0 d-flex flex-column align-items-center justify-content-center' style={{backgroundColor:"#318CE7",height:'100vh'}}>
      <InfoMessage showToast={showToast} msg={msg} type={type}/>
      <form className='mt-3 mb-3 pt-4 px-3' onSubmit={handleSubmit} style={{backgroundColor:"white",borderRadius: '10px',width:'50vw'}} >
        <img src={logimg} className="center" style={{display:'block',margin:'0 auto',width:'100px'}}alt="..."/>
        <h2 className='mb-3' style={{textAlign:"center",width:'100%'}}>Sign Up</h2>
       <div className='mx-0' style={{display:'flex'}}>
        
        <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

        </div>
        </div>
               <div className='mx-0' style={{display:'flex'}}>
        
         <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="phone_number" name="phone_number" onChange={onChange} aria-describedby="phoneHelp"/>
        </div>
         <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>

        </div>
               <div className='mx-0' style={{display:'flex'}}>
        
        <div className="mb-3" style={{width:'100%'}}>
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3 ms-3" style={{width:'100%'}}>
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

        <button type="submit" className="btn btn-primary mb-2" style={{width:'50%',display:'block',margin:'auto'}} >Register</button>
          <p className="ms-0 mt-0 mb-5" style={{textAlign:'center'}}>
        Already have an account?{' '}
        <Link to="/login" style={{textDecoration:'underline'}}>
         Sign In
        </Link>

      </p>
      </form>
     
    </div>
  )
}

export default SignUp
