const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Photographer = require('../../models/Photographer');
const { body, validationResult } = require('express-validator');


router.get('/fetchphotographerbyId',fetchuser,async (req,res)=>{
    try {
    
    const photographers=await Photographer.find({user_id:req.header('id')});
    //const questions=await Questions.find({user:req.user.id});
        res.json(photographers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    })
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallphotographers',fetchuser,async (req,res)=>{
    try {
    
    const photographers=await Photographer.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(photographers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addphotographer',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {user_id,rate,availability_status}=req.body;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const photographer=new Photographer({
            user_id,rate,availability_status
        })
        const savedPhotographer=await photographer.save();
        success=true;
        res.json({success,data:savedPhotographer})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
router.put('/updatephotographer/:id',fetchuser,async (req,res)=>{
    const {user_id,rate,availability_status}=req.body;
    const newPhotographer={};
    if(user_id){newPhotographer.user_id=user_id};
    if(rate){newPhotographer.rate=rate};
    newPhotographer.availability_status=availability_status;

    let photographer=await Photographer.findById(req.params.id);
    if(!photographer){return res.status(404).send("Not Found")}


    photographer =await Photographer.findByIdAndUpdate(req.params.id,{$set:newPhotographer},{new:true})
    res.json({success: true, data:photographer});
})
router.delete('/deletephotographer/:id',fetchuser,async (req,res)=>{

    let photographer=await Photographer.findById(req.params.id);
    if(!photographer){return res.status(404).send("Not Found")}

    

    photographer =await Photographer.findByIdAndDelete(req.params.id)
    res.json({"Success":"Photographer has been deleted.",photographer:photographer});
})
module.exports = router