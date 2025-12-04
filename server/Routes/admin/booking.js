const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Booking = require('../../models/Booking');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallbookings',fetchuser,async (req,res)=>{
    try {
    
    const bookings=await Booking.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(bookings)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addbooking',fetchuser,[
    body('status').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {user,event,quantity,totalAmount,bookingDate,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const book=new Booking({
            user,event,quantity,totalAmount,bookingDate,status
        })
        const savedBooking=await book.save();
        success=true;
        res.json({success,data:savedBooking})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatebooking/:id',fetchuser,async (req,res)=>{
    const {user,event,quantity,totalAmount,bookingDate,status}=req.body;
    const newBooking={};
    if(user){newBooking.user=user};
    if(event){newBooking.event=event};
    if(quantity){newBooking.quantity=quantity};
    if(totalAmount){newBooking.totalAmount=totalAmount};
    if(bookingDate){newBooking.bookingDate=bookingDate};
    if(status){newBooking.status=status};

    let book=await Booking.findById(req.params.id);
    if(!book){return res.status(404).send("Not Found")}


    book =await Booking.findByIdAndUpdate(req.params.id,{$set:newBooking},{new:true})
    res.json({success: true, data:book});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletebooking/:id',fetchuser,async (req,res)=>{

    let book=await Booking.findById(req.params.id);
    if(!book){return res.status(404).send("Not Found")}

    

    book =await Booking.findByIdAndDelete(req.params.id)
    res.json({"Success":"Booking has been deleted.",book:book});
})
module.exports = router