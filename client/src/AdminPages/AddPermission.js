
import React,{useState,useContext} from 'react'
import permissionContext from '../context/permissionContext'
import InfoMessage from '../components/InfoMessage';

const AddPermission = () => {
    const context=useContext(permissionContext);
    const {addPermission}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [permission, setPermission] = useState('');

    const handlePermissionChange = (e) => {
    setPermission(e.target.value); // <-- Get input value here
  };
  

  const addPermissions=(e)=>{
          e.preventDefault();
          const success=addPermission(permission)
          if(success)
          {
            setShowToast(true);
            setMsg("Permission added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addPermissions}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="permission" className="form-label">Enter Permission:</label>
        <input type="text" className="form-control" id="permission" value={permission} name="permission" onChange={handlePermissionChange} />
    </div>
    <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
      <button disabled={permission.length<1} type="submit" className="btn btn-primary" >Add Permission</button>
      </form>
    </div>
  )
}

export default AddPermission
