const express= require("express")
const app=express()
require("dotenv").config()
const mongoose=require("mongoose")
const adminRoute=require("./route/adminRoutes")
const userRoute=require("./route/userRoute")
const cors=require("cors")
const bodyParser=require("body-parser")
const port=process.env.PORT || 8000;

mongoose.connect(process.env.DBCON, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use("/admin",adminRoute)
app.use("/user",userRoute)
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})