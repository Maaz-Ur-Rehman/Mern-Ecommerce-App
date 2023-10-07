const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:false,

    },
    profilePicture:{
        type:String,
        required:false
    },
    id:{
        type:String,
    
    },

    // phone:{
    //     type:String,
    //     required:true,
        
    // },
    // address:{
    //     type:String,
    //     required:true,
        
    // },
    // answer:{
    //     type:String,
    //     required:true
    // },
    role:{
        type:Number,
        default:0
        
    }


},{timestamps:true})

const userModel=mongoose.model('user',userSchema)
module.exports= userModel 