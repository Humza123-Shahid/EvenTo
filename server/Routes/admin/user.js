const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallusers',fetchuser,async (req,res)=>{
    try {
    
    const users=await User.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(users)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/adduser',fetchuser,[
    body('fullName').isLength({ min: 1 }),
    body('email').isEmail(),
    body('password').isLength({ min: 3 }),
    body('phone').isMobilePhone('any', { strictMode: false })
],async (req,res)=>{
    try {
        let success = false;
        const {fullName,email,password,phone,role_id}=req.body;
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const user=new User({
            fullName,email,password,phone,role_id
        })
        const savedUser=await user.save();
        success=true;
        res.json({success,data:savedUser})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateuser/:id',fetchuser,async (req,res)=>{
    const {fullName,email,password,phone,role_id}=req.body;
    const newUser={};
    if(fullName){newUser.fullName=fullName};
    if(email){newUser.email=email};
    if(password){newUser.password=password};
    if(phone){newUser.phone=phone};
    if(role_id){newUser.role_id=role_id};

    let user=await User.findById(req.params.id);
    if(!user){return res.status(404).send("Not Found")}


    user =await User.findByIdAndUpdate(req.params.id,{$set:newUser},{new:true})
    res.json({success: true, data:user});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteuser/:id',fetchuser,async (req,res)=>{

    let user=await User.findById(req.params.id);
    if(!user){return res.status(404).send("Not Found")}

    

    user =await User.findByIdAndDelete(req.params.id)
    res.json({"Success":"User has been deleted.",user:user});
})
module.exports = router