const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Package = require('../../models/Package');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallpackages',fetchuser,async (req,res)=>{
    try {
    
    const package=await Package.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(package)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addpackage',fetchuser,[
    body('PackageName').isLength({ min: 1 }),
    body('PackageType').isLength({ min: 1 }),
    body('Description').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {EventID,PackageName,PackageType,Description,Price,AvailabilityStatus}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const package=new Package({
            EventID,PackageName,PackageType,Description,Price,AvailabilityStatus
        })
        const savedPackage=await package.save();
        success=true;
        res.json({success,data:savedPackage})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatepackage/:id',fetchuser,async (req,res)=>{
    const {EventID,PackageName,PackageType,Description,Price,AvailabilityStatus}=req.body;
    const newPackage={};
    if(EventID){newPackage.EventID=EventID};
    if(PackageName){newPackage.PackageName=PackageName};
    if(PackageType){newPackage.PackageType=PackageType};
    if(Description){newPackage.Description=Description};
    if(Price){newPackage.Price=Price};
    newPackage.AvailabilityStatus=AvailabilityStatus;

    let package=await Package.findById(req.params.id);
    if(!package){return res.status(404).send("Not Found")}


    package =await Package.findByIdAndUpdate(req.params.id,{$set:newPackage},{new:true})
    res.json({success: true, data:package});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletepackage/:id',fetchuser,async (req,res)=>{

    let package=await Package.findById(req.params.id);
    if(!package){return res.status(404).send("Not Found")}

    

    package =await Package.findByIdAndDelete(req.params.id)
    res.json({"Success":"Package has been deleted.",package:package});
})
module.exports = router