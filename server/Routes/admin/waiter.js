const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Waiter = require('../../models/Waiter');
const { body, validationResult } = require('express-validator');


router.get('/fetchwaiterbyId',fetchuser,async (req,res)=>{
    try {
    
    const waiters=await Waiter.find({user_id:req.header('id')});
    //const questions=await Questions.find({user:req.user.id});
        res.json(waiters)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallwaiters',fetchuser,async (req,res)=>{
    try {
    
    const waiters=await Waiter.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(waiters)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addwaiter',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {user_id,experienceLevel,salary}=req.body;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const waiter=new Waiter({
            user_id,experienceLevel,salary
        })
        const savedWaiter=await waiter.save();
        success=true;
        res.json({success,data:savedWaiter})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
router.put('/updatewaiter/:id',fetchuser,async (req,res)=>{
    const {user_id,experienceLevel,salary}=req.body;
    const newWaiter={};
    if(user_id){newWaiter.user_id=user_id};
    if(experienceLevel){newWaiter.experienceLevel=experienceLevel};
    if(salary){newWaiter.salary=salary};

    let waiter=await Waiter.findById(req.params.id);
    if(!waiter){return res.status(404).send("Not Found")}


    waiter =await Waiter.findByIdAndUpdate(req.params.id,{$set:newWaiter},{new:true})
    res.json({success: true, data:waiter});
})
router.delete('/deletewaiter/:id',fetchuser,async (req,res)=>{

    let waiter=await Waiter.findById(req.params.id);
    if(!waiter){return res.status(404).send("Not Found")}

    

    waiter =await Waiter.findByIdAndDelete(req.params.id)
    res.json({"Success":"Waiter has been deleted.",waiter:waiter});
})
module.exports = router