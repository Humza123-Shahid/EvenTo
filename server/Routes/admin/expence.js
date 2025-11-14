const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Expence = require('../../models/Expence');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Expences using :GET "/api/expences/fetchallexpences".Login required
router.get('/fetchallexpences',fetchuser,async (req,res)=>{
    try {
    
    const expences=await Expence.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(expences)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Expence using :POST "/api/expences/addexpences".Login required
router.post('/addexpence',fetchuser,[
    body('category').isLength({ min: 1 }),
    body('description').isLength({ min: 1 }),

],async (req,res)=>{
    try {
        
        let success = false;
        const {event,category,amount,description,date}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const expence=new Expence({
            event,category,amount,description,date
        })
        const savedExpence=await expence.save();
        success=true;
        res.json({success,data:savedExpence})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Expence using :PUT "/api/expences/updateexpences".Login required
router.put('/updateexpence/:id',fetchuser,async (req,res)=>{
    const {event,category,amount,description,date}=req.body;
    const newExpence={};
    if(event){newExpence.event=event};
    if(category){newExpence.category=category};
    if(amount){newExpence.amount=amount};
    if(description){newExpence.description=description};
    if(date){newExpence.date=date};

    
    let expence=await Expence.findById(req.params.id);
    if(!expence){return res.status(404).send("Not Found")}


    expence =await Expence.findByIdAndUpdate(req.params.id,{$set:newExpence},{new:true})
    res.json({success: true, data:expence});
})
// ROUTE 4: Delete an existing Expence using :DELETE "/api/expences/deleteexpences".Login required
router.delete('/deleteexpence/:id',fetchuser,async (req,res)=>{

    let expence=await Expence.findById(req.params.id);
    if(!expence){return res.status(404).send("Not Found")}

    

    expence =await Expence.findByIdAndDelete(req.params.id)
    res.json({"Success":"Expence has been deleted.",expence:expence});
})
module.exports = router