const jwt=require('jsonwebtoken')

function authenticateToken(req, res, next) {
 
    try{
        const authHeader = req.headers.authorization
       
         
        /* Seperating Bearer from token */
      
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) {
          return res.status(401).json({error:{message:'Access Denied'}})
        }
       
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            
          if (err){
            console.log(err)
            return res.status(403).json({error:{message:'Access Denied'}})
          } 
          console.log(`user is ${user}`)
          req.user = user
          console.log('passing to function')
          next()
        })
    }
    catch(err){
        return res.status(403).json({error:{message:'Access Denied'}})
    }
    
  }

  module.exports=authenticateToken