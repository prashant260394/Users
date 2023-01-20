const router = require('express').Router();
const User=require('../models/userModel')

router.post('/users', async (req,res)=>{
    try{
        const {name,email,phonenumber}=req.body;
    
        const user=new User({name,email,phonenumber});
    
        await user.save()
    
       return res.status(200).json({message:'User saved',user})
    }
    catch(error){
       return res.status(500).json({error:{error, message:'The error has occured while saving the data'}})
    }


})

router.get('/users', async (req,res)=>{
    console.log('starting another funciton')
    try{
       const {name,email}=req.query
       let user
       if(name && email){
         user = await User.find({name:name, email:email}).exec()
       }
       else if(name){
         user = await User.find({name:name}).exec()
       }
       else if(email){
         user= await User.find({email:email}).exec()
       }
       else{
         user = await User.find({}).exec()
       }
       if(!user){
        return res.status(404).json({error:{message:'User not found'}})
       }
      return res.status(200).json({user})
    }
    catch(error){
       return res.status(500).json({error:{error,message:'Error occured while fetching User data'}})
    }
})

module.exports=router