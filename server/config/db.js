const mongoose=require('mongoose')


const connectDB=async()=>{


    try{
    const conn=await mongoose.connect(process.env.DB_URL)
        
        console.log(`connected to mongodb Database ${conn.connection.host}`)
    }
    catch(err){
        console.log(`Error in mongoDb${err}`)
    }


}

module.exports=connectDB