const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Permission = require('../../models/Permission');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallpermissions',async (req,res)=>{
    try {
    
    const permissions=await Permission.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(permissions)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addpermission',[
    body('permission').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {permission}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const permission2=new Permission({
            permission
        })
        const savedPermission=await permission2.save();
        console.log(savedPermission)
        success=true;
        res.json({success,data:savedPermission})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.put('/updatepermission/:id',fetchuser,async (req,res)=>{
    const {permission}=req.body;
    const newPermission={};
    if(permission){newPermission.permission=permission};

    let permission2=await Permission.findById(req.params.id);
    if(!permission2){return res.status(404).send("Not Found")}


    permission2 =await Permission.findByIdAndUpdate(req.params.id,{$set:newPermission},{new:true})
    res.json({success: true, data:permission2});
})
router.delete('/deletepermission/:id',fetchuser,async (req,res)=>{

    let permission=await Permission.findById(req.params.id);
    if(!permission){return res.status(404).send("Not Found")}

    

    permission =await Permission.findByIdAndDelete(req.params.id)
    res.json({"Success":"Permission has been deleted.",permission:permission});
})
module.exports = router