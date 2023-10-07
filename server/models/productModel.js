const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"category",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    shipping:{
        type:Boolean
    }


},{timestamps:true})


const ProductModel=mongoose.model("product",ProductSchema)


module.exports=ProductModel