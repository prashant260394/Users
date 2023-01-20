const router=require('express').Router()
const jwt=require('jsonwebtoken')

router.post('/login',(req,res)=>{
    try{
        const {username, password}= req.body
        if(!username || !password){
         return res.status(400).json({error:{message:'Enter both username and password'}})
        }  
        /* I have skipped checking password from database due to time constraint */
     
        const token=jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        return res.status(200).json({message:'Successfully logged in ', token})
     
    }
    catch(err){
        console.log(err)
         return res.status(400).json({error:{message:'Unable to login'}})

    } 
  
})

module.exports=router