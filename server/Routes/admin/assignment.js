const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Assignment = require('../../models/Assignment');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallassignments',fetchuser,async (req,res)=>{
    try {
    
    const assignments=await Assignment.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(assignments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addassignment',fetchuser,async (req,res)=>{
    try {
        let success = false;
        const {allStaff,event_id,shift_start,shift_end}=req.body;
        let savedAssignment;
        allStaff.forEach(async function(user) {
                await Assignment.create(
                    { user_id:user,event_id:event_id,shift_start:shift_start,shift_end:shift_end})
                
                
            });
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ success,errors: errors.array() });
        // }
        // const assignment=new Assignment({
        //     staff_id,event_id,role_id,shift_start,shift_end
        // })
        // const savedAssignment=await assignment.save();
        success=true;
        res.json({success})
        // res.json({success,data:savedAssignment})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateassignment/:id',fetchuser,async (req,res)=>{
    let success = false;
    const {event_id,shift_start,shift_end}=req.body;
    const newAssignment={};
    //if(user_id){newAssignment.user_id=user_id};
    if(event_id){newAssignment.event_id=event_id};
    if(shift_start){newAssignment.shift_start=shift_start};
    if(shift_end){newAssignment.shift_end=shift_end};

    let assignment=await Assignment.findById(req.params.id);
    if(!assignment){return res.status(404).send("Not Found")}


    assignment =await Assignment.findByIdAndUpdate(req.params.id,{$set:newAssignment},{new:true})
    success=true;
    res.json({success, data:assignment});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteassignment/:id',fetchuser,async (req,res)=>{

    let assignment=await Assignment.findById(req.params.id);
    if(!assignment){return res.status(404).send("Not Found")}

    

    assignment =await Assignment.findByIdAndDelete(req.params.id)
    res.json({"Success":"Assignment has been deleted.",assignment:assignment});
})
module.exports = router