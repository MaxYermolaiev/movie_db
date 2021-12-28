const {Schema,Types,model} = require("mongoose")

const user = new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    userData: {type:Object,required:true},
    storage:{ type: Types.ObjectId, ref: 'UserStorage' }
})
module.exports =model("User",user)