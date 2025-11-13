const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Event = require('../../models/Event');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallevents',fetchuser,async (req,res)=>{
    try {
    
    const events=await Event.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addevent',fetchuser,[
    body('eventName').isLength({ min: 1 }),
    body('description').isLength({ min: 3 }),
    body('category').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {organizer,eventName,description,category,venue,eventDate,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const event=new Event({
            organizer,eventName,description,category,venue,eventDate,status
        })
        const savedEvent=await event.save();
        success=true;
        res.json({success,data:savedEvent})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateevent/:id',fetchuser,async (req,res)=>{
    const {organizer,eventName,description,category,venue,eventDate,status}=req.body;
    const newEvent={};
    if(organizer){newEvent.organizer=organizer};
    if(eventName){newEvent.eventName=eventName};
    if(description){newEvent.description=description};
    if(category){newEvent.category=category};
    if(venue){newEvent.venue=venue};
    if(eventDate){newEvent.eventDate=eventDate};
    if(status){newEvent.status=status};

    let event=await Event.findById(req.params.id);
    if(!event){return res.status(404).send("Not Found")}


    event =await Event.findByIdAndUpdate(req.params.id,{$set:newEvent},{new:true})
    res.json({success: true, data:event});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteevent/:id',fetchuser,async (req,res)=>{

    let event=await Event.findById(req.params.id);
    if(!event){return res.status(404).send("Not Found")}

    

    event =await Event.findByIdAndDelete(req.params.id)
    res.json({"Success":"Event has been deleted.",event:event});
})
module.exports = router