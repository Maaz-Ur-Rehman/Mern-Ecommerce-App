const mongoose=require('mongoose')


const categorySchema=mongoose.Schema({
    name:{
        type:String,

    },
    slug:{
        type:String,
        lowercase:true
    }


},{timestamps:true})


const categoryModel=mongoose.model('category',categorySchema)

module.exports=categoryModel