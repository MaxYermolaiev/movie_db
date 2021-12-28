const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const Users = require("../schema/user")
const config = require("config")

class UserRoute{
     async loginAccount(req,res){
         try{
             const {email,password} = req.body;
             const errors = UserRoute.validation(req.body);
             if(Object.keys(errors).length>0){return res.status(400).json({
                     status:'error',
                     errors: errors})
             };
             //else try to find user in DB, if not exist or password wrong - send the message with mistake
             let candidate = await Users.findOne({email})
             if(!candidate){return res.status(400).json({
                 status:'error',
                 errors: {email:"User with this email not exist"}
             })};
             console.log(candidate);
             //if user exist compare password with hashed
             let passwordCompareError =await bcrypt.compare(password,candidate.password)
             if(!passwordCompareError){return res.status(400).json({
                 status:'error',
                 errors: {password:"Wrong password, please try again"}})}
             const token = jwt.sign({userID: candidate.id},config.get('jwt'),{ expiresIn: '12h' })
             return res.status(200).json({id:candidate.id, jwt:token,user_data:candidate.userData})
         }
         catch (e) {
             console.log(e.message)
             return res.status(500).json({
                 status:'error',
                 message:"server side error"
                 })}
         }

     async createAccount(req,res){
          try{
             const {email,password,...rest} = req.body;
             const validationResults = UserRoute.validation(req.body);
             if(Object.keys(validationResults).length>0){return res.status(400).json({
                     status:'error',
                     message:'incorrect data please try again',
                     errors: validationResults});
             }
             //else try to find user in the database,if not exist or password wrong - send a message with mistake
             const candidate =await Users.findOne({email});
             if(candidate){
                 return res.status(400).json({
                     status:'error',
                     errors:{
                        email:'user with this email already exist'
                           }
                 })
             }
             let hashPassword = await bcrypt.hash(password,12)
             const user = new Users({ email,password: hashPassword,userData:rest })
                   await user.save();
             return res.status(201).json({
                       status:'success',
                       message:'new user successfully created'})
         }
         catch (e) {
             return res.status(500).json({status:'error',message:'server side error'})}
         }

    static validation=(props)=>{
        let results = {};
        let schema = {
            email:/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/,
            password:/[0-9]{6,}/g,
            phone:/^\+380[0-9]{9}$/,
            city:/[A-Za-z]{3,}/,
            nick:/[A-Za-z,0-9]{4,}/
        }
        let test =(key,value)=> schema[key]?schema[key].test(value):schema.default.test(value);
        let validate=(props)=>{
            results = {};
            for(let [key,value] of Object.entries(props)){
                if(!test(key,value))results[key]=mistakesDescription[key];
            }
        }
        let mistakesDescription={
            email:"Incorrect email, please check it...Example 'youremail@provider.com'",
            password:"Incorrect not correct,use letters and digits. Minimum 6 symbols.",
            nick:"Nickname must be longer 4 symbols, can contain letters and digits",
            city:"City length must be more 2 letters",
            phone:"Phone not correct, it should be like example - +380442233444"
        }
        validate(props);
        return results;
    }
}

const userRoute = new UserRoute()
router.post("/login", userRoute.loginAccount)
router.post("/registration",userRoute.createAccount)
module.exports = router;