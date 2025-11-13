const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Dish = require('../../models/Dish');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalldishes',fetchuser,async (req,res)=>{
    try {
    
    const dishes=await Dish.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(dishes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/adddish',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('category').isLength({ min: 1 }),
    body('ingredients').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,category,cost,menu_id,ingredients}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const dish=new Dish({
            name,category,cost,menu_id,ingredients
        })
        const savedDish=await dish.save();
        success=true;
        res.json({success,data:savedDish})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatedish/:id',fetchuser,async (req,res)=>{
    const {name,category,cost,menu_id,ingredients}=req.body;
    const newDish={};
    if(name){newDish.name=name};
    if(category){newDish.category=category};
    if(cost){newDish.cost=cost};
    if(menu_id){newDish.menu_id=menu_id};
    if(ingredients){newDish.ingredients=ingredients};

    let dish=await Dish.findById(req.params.id);
    if(!dish){return res.status(404).send("Not Found")}


    dish =await Dish.findByIdAndUpdate(req.params.id,{$set:newDish},{new:true})
    res.json({success: true, data:dish});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletedish/:id',fetchuser,async (req,res)=>{

    let dish=await Dish.findById(req.params.id);
    if(!dish){return res.status(404).send("Not Found")}

    

    dish =await Dish.findByIdAndDelete(req.params.id)
    res.json({"Success":"Dish has been deleted.",dish:dish});
})
module.exports = router