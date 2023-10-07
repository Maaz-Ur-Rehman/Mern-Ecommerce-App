const mongoose=require('mongoose')

const TokenSchema=mongoose.Schema({
    token:{
        type:String,
        required:true
    },
   

},{timestamps:true})


const tokenModel=mongoose.model("token",TokenSchema)


module.exports=tokenModel