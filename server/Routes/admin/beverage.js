const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Beverage = require('../../models/Beverage');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallbeverages',fetchuser,async (req,res)=>{
    try {
    
    const beverages=await Beverage.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(beverages)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addbeverage',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('type').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,type,price,availableQuantity}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const beverage=new Beverage({
            name,type,price,availableQuantity
        })
        const savedBeverage=await beverage.save();
        success=true;
        res.json({success,data:savedBeverage})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatebeverage/:id',fetchuser,async (req,res)=>{
    const {name,type,price,availableQuantity}=req.body;
    const newBeverage={};
    if(name){newBeverage.name=name};
    if(type){newBeverage.type=type};
    if(price){newBeverage.price=price};
    if(availableQuantity){newBeverage.availableQuantity=availableQuantity};

    let beverage=await Beverage.findById(req.params.id);
    if(!beverage){return res.status(404).send("Not Found")}


    beverage =await Beverage.findByIdAndUpdate(req.params.id,{$set:newBeverage},{new:true})
    res.json({success: true, data:beverage});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletebeverage/:id',fetchuser,async (req,res)=>{

    let beverage=await Beverage.findById(req.params.id);
    if(!beverage){return res.status(404).send("Not Found")}

    

    beverage =await Beverage.findByIdAndDelete(req.params.id)
    res.json({"Success":"Beverage has been deleted.",beverage:beverage});
})
module.exports = router