const express=require('express')
const dotenv=require('dotenv')
const connectDB = require('./config/db')
const morgan=require('morgan')
const cors=require('cors')
const authRoutes=require('./routers/userRoutes')
const categoryRoutes=require('./routers/categoryRoutes')
const productRoutes=require('./routers/productRoutes')
const bodyParser = require('body-parser')
const customCron=require('./controllers/cron')
dotenv.config()

connectDB()
const app=express()
app.use(express.json())

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/uploads", express.static("uploads"));
app.use('/',authRoutes)
app.use('/',categoryRoutes)
app.use('/',productRoutes)
// customCron.startPushNotificationsCron()




app.get('/',(req,res)=>{
    res.send({
        messege:"Welcome "
    })
})


const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})