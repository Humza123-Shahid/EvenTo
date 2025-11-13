const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Vendor = require('../../models/Vendor');
const { body, validationResult } = require('express-validator');


router.get('/fetchvendorbyId',fetchuser,async (req,res)=>{
    try {
    
    const vendors=await Vendor.find({user_id:req.header('id')});
    //const questions=await Questions.find({user:req.user.id});
        res.json(vendors)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallvendors',fetchuser,async (req,res)=>{
    try {
    
    const vendors=await Vendor.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(vendors)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addvendor',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {user_id,service_type,rating}=req.body;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const vendor=new Vendor({
            user_id,service_type,rating
        })
        const savedVendor=await vendor.save();
        success=true;
        res.json({success,data:savedVendor})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
router.put('/updatevendor/:id',fetchuser,async (req,res)=>{
    const {user_id,service_type,rating}=req.body;
    console.log(req.params.id,user_id,service_type,rating)
    const newVendor={};
    if(user_id){newVendor.user_id=user_id};
    if(service_type){newVendor.service_type=service_type};
    if(rating){newVendor.rating=rating};

    let vendor=await Vendor.findById(req.params.id);
    console.log(vendor)
    if(!vendor){return res.status(404).send("Not Found")}

   
    vendor =await Vendor.findByIdAndUpdate(req.params.id,{$set:newVendor},{new:true})
    console.log(vendor)
    res.json({success: true, data:vendor});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletevendor/:id',fetchuser,async (req,res)=>{

    let vendor=await Vendor.findById(req.params.id);
    if(!vendor){return res.status(404).send("Not Found")}

    

    vendor =await Vendor.findByIdAndDelete(req.params.id)
    res.json({"Success":"Vendor has been deleted.",vendor:vendor});
})
module.exports = router