const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Payment = require('../../models/Payment');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallpayments',fetchuser,async (req,res)=>{
    try {
    
    const payments=await Payment.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(payments)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addpayment',fetchuser,[
    body('paymentMethod').isLength({ min: 1 }),
    body('transactionId').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {user,booking,amount,paymentMethod,transactionId,status,paymentDate}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const payment=new Payment({
            user,booking,amount,paymentMethod,transactionId,status,paymentDate
        })
        const savedPayment=await payment.save();
        success=true;
        res.json({success,data:savedPayment})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepayment/:id',fetchuser,async (req,res)=>{
    const {user,booking,amount,paymentMethod,transactionId,status,paymentDate}=req.body;
    const newPayment={};
    if(user){newPayment.user=user};
    if(booking){newPayment.booking=booking};
    if(amount){newPayment.amount=amount};
    if(paymentMethod){newPayment.paymentMethod=paymentMethod};
    if(transactionId){newPayment.transactionId=transactionId};
    if(status){newPayment.status=status};
    if(paymentDate){newPayment.paymentDate=paymentDate};

    let payment=await Payment.findById(req.params.id);
    if(!payment){return res.status(404).send("Not Found")}


    payment =await Payment.findByIdAndUpdate(req.params.id,{$set:newPayment},{new:true})
    res.json({success: true, data:payment});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletepayment/:id',fetchuser,async (req,res)=>{

    let payment=await Payment.findById(req.params.id);
    if(!payment){return res.status(404).send("Not Found")}

    

    payment =await Payment.findByIdAndDelete(req.params.id)
    res.json({"Success":"Payment has been deleted.",payment:payment});
})
module.exports = router