const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Staff = require('../../models/Staff');
const { body, validationResult } = require('express-validator');



router.get('/fetchstaffbyId',fetchuser,async (req,res)=>{
    try {
    
    const staffs=await Staff.find({user_id:req.header('id')});
    //const questions=await Questions.find({user:req.user.id});
        res.json(staffs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallstaffs',fetchuser,async (req,res)=>{
    try {
    
    const staffs=await Staff.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(staffs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addstaff',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {user_id,salary,availability_status}=req.body;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const staff=new Staff({
            user_id,salary,availability_status
        })
        const savedStaff=await staff.save();
        success=true;
        res.json({success,data:savedStaff})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.put('/updatestaff/:id',fetchuser,async (req,res)=>{
    const {user_id,salary,availability_status}=req.body;
    const newStaff={};
    if(user_id){newStaff.user_id=user_id};
    if(salary){newStaff.salary=salary};
    newStaff.availability_status=availability_status;

    let staff=await Staff.findById(req.params.id);
    if(!staff){return res.status(404).send("Not Found")}


    staff =await Staff.findByIdAndUpdate(req.params.id,{$set:newStaff},{new:true})
    res.json({success: true, data:staff});
})
router.delete('/deletestaff/:id',fetchuser,async (req,res)=>{

    let staff=await Staff.findById(req.params.id);
    if(!staff){return res.status(404).send("Not Found")}

    

    staff =await Staff.findByIdAndDelete(req.params.id)
    res.json({"Success":"Staff has been deleted.",staff:staff});
})
module.exports = router