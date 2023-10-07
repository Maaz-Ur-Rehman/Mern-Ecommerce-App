const bcrypt=require('bcryptjs')


const authHelpers={

    hashPassword:async(password)=>{
        try{
            const saltRounds=10;
            const hashedPassword=await bcrypt.hash(password,saltRounds)
            return hashedPassword
        }
        catch(err){
            console.log(err,"err")

        }
    },
    comparePassword:async(password,hashedPassword)=>{
     return  bcrypt.compare(password,hashedPassword)  
    }

}


module.exports=authHelpers