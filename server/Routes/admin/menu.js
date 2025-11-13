const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Menu = require('../../models/Menu');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallmenus',fetchuser,async (req,res)=>{
    try {
    
    const menu=await Menu.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(menu)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addmenu',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('type').isLength({ min: 1 }),
    body('description').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {name,type,pricePerPerson,description}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const menu=new Menu({
            name,type,pricePerPerson,description
        })
        const savedMenu=await menu.save();
        success=true;
        res.json({success,data:savedMenu})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatemenu/:id',fetchuser,async (req,res)=>{
    const {name,type,pricePerPerson,description}=req.body;
    const newMenu={};
    if(name){newMenu.name=name};
    if(type){newMenu.type=type};
    if(pricePerPerson){newMenu.pricePerPerson=pricePerPerson};
    if(description){newMenu.description=description};

    let menu=await Menu.findById(req.params.id);
    if(!menu){return res.status(404).send("Not Found")}


    menu =await Menu.findByIdAndUpdate(req.params.id,{$set:newMenu},{new:true})
    res.json({success: true, data:menu});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletemenu/:id',fetchuser,async (req,res)=>{

    let menu=await Menu.findById(req.params.id);
    if(!menu){return res.status(404).send("Not Found")}

    

    menu =await Menu.findByIdAndDelete(req.params.id)
    res.json({"Success":"Menu has been deleted.",menu:menu});
})
module.exports = router