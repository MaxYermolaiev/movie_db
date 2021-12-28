const jwt = require('jsonwebtoken')
const config = require("config")
module.exports=(req,res,next)=>{

    req.method==="OPTIONS"?next:null;
    try{
        const token = req.headers.credentials.split(' ')[1]
        if(!token){res.status(401).json({message: "user without credentials"})}
        let decoded = jwt.verify(token,config.get('jwt'))
        req.credential = decoded;
        next()
    }catch(e){
        res.json({message: e.message})
    }
}