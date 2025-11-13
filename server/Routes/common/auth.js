const express=require('express');
const User =require('../../models/User')
const Role =require('../../models/Role')
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser=require('../../middleware/fetchuser');

const JWT_SECRET="Harryisagoodboy";

// ROUTE 1: Create a User using:POST "/api/auth/createuser".No login required
router.post('/registeruser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('phone_number').isMobilePhone('any', { strictMode: false })
],async (req,res)=>{
  console.log("function connected");
   let success=false;
    //If there are errors,return Bad request and the errors
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try{

    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email alreaddy exists"})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user=await User.create({
      role:req.body.user,
      //category:req.body.category,
      fullName: req.body.name,
      phone:req.body.phone_number,
      password: secPass,
      email: req.body.email,
      role_id:req.body.roleId
    })
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    //     res.json({error:'pleae enter a unique value for email.',message:err.message});
    //     }) 
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET)   
    success=true;  
    
    //res.json(user) 
    res.json({success,authtoken}) 
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }   
});
// ROUTE 2: Authenticate a User using:POST "/api/auth/login".No login required
router.post('/login',[ 

    body('email').isEmail(),
    body('password').exists()
],async (req,res)=>{
 let success=false;
  //If there are errors,return Bad request and the errors
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password}=req.body
    try{
        let user=await User.findOne({email});
        if(!user)
        {
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }
        // const passwordCompare= await bcrypt.compare(password,user.password);
        const passwordCompare= password==user.password
        if(!passwordCompare)
        {
          return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }  
        const data={
        user:{
            id:user.id
          }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)  
        success=true;
        const userRole=await Role.findById(user.role_id)
        const userType=userRole.name;  
        //const userType=user.role_id;   
        //const userType=user.role;
        //const qclass=user.user_class;
        //const category=user.category;
        
        //res.json(user) 
        //res.json({success,userType,category,authtoken}) 
        res.json({success,authtoken,userType}) 

    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Get loggedin User Details using:POST "/api/auth/getuser".Login required
// router.get('/getusers',fetchuser,async (req,res)=>{

//     try{
//       const count = await User
//       .distinct("_id", { role: "student" }) // condition here
//       .then(users => users.length);
//       // const userId=req.user.id;
//       // const user=await User.findById(userId).select("-password")
//       // res.send(user);
//       res.json({count});
//     }
//     catch(error){
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
// })
module.exports =router