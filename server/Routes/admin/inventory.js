const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Inventory = require('../../models/Inventory');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallinventories',fetchuser,async (req,res)=>{
    try {
    
    const inventory=await Inventory.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(inventory)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addinventory',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('category').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,category,rentalPrice,availableQuantity,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const inventory=new Inventory({
            name,category,rentalPrice,availableQuantity,status
        })
        const savedInventory=await inventory.save();
        success=true;
        res.json({success,data:savedInventory})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateinventory/:id',fetchuser,async (req,res)=>{
    const {name,category,rentalPrice,availableQuantity,status}=req.body;
    const newInventory={};
    if(name){newInventory.name=name};
    if(category){newInventory.category=category};
    if(rentalPrice){newInventory.rentalPrice=rentalPrice};
    if(availableQuantity){newInventory.availableQuantity=availableQuantity};
    if(status){newInventory.status=status};

    let inventory=await Inventory.findById(req.params.id);
    if(!inventory){return res.status(404).send("Not Found")}


    inventory =await Inventory.findByIdAndUpdate(req.params.id,{$set:newInventory},{new:true})
    res.json({success: true, data:inventory});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteinventory/:id',fetchuser,async (req,res)=>{

    let inventory=await Inventory.findById(req.params.id);
    if(!inventory){return res.status(404).send("Not Found")}

    

    inventory =await Inventory.findByIdAndDelete(req.params.id)
    res.json({"Success":"Inventory has been deleted.",inventory:inventory});
})
module.exports = router