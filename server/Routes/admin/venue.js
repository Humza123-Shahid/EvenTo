const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Venue = require('../../models/Venue');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallvenues',fetchuser,async (req,res)=>{
    try {
    
    const venue=await Venue.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(venue)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addvenue',fetchuser,[
    body('venueName').isLength({ min: 1 }),
    body('address').isLength({ min: 3 }),
    body('city').isLength({ min: 3 }),
    body('contactPerson').isLength({ min: 1 }),
    body('contactPhone').isMobilePhone('any', { strictMode: false })
],async (req,res)=>{
    try {
        let success = false;
        const {venueName,address,city,capacity,contactPerson,contactPhone}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const venue=new Venue({
           venueName,address,city,capacity,contactPerson,contactPhone
        })
        const savedVenue=await venue.save();
        success=true;
        res.json({success,data:savedVenue})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatevenue/:id',fetchuser,async (req,res)=>{
    const {venueName,address,city,capacity,contactPerson,contactPhone}=req.body;
    const newVenue={};
    if(venueName){newVenue.venueName=venueName};
    if(address){newVenue.address=address};
    if(city){newVenue.city=city};
    if(capacity){newVenue.capacity=capacity};
    if(contactPerson){newVenue.contactPerson=contactPerson};
    if(contactPhone){newVenue.contactPhone=contactPhone};


    let venue=await Venue.findById(req.params.id);
    if(!venue){return res.status(404).send("Not Found")}


    venue =await Venue.findByIdAndUpdate(req.params.id,{$set:newVenue},{new:true})
    res.json({success: true, data:venue});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletevenue/:id',fetchuser,async (req,res)=>{

    let venue=await Venue.findById(req.params.id);
    if(!venue){return res.status(404).send("Not Found")}

    

    venue =await Venue.findByIdAndDelete(req.params.id)
    res.json({"Success":"Venue has been deleted.",venue:venue});
})
module.exports = router