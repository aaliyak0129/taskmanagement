const adminModel = require("../Modles/adminModel");
const userModel=require("../Modles/userModel")
const userPassword=require("../Middlewares/randomPsw")
const taskModel=require("../Modles/taskModel")
var nodemailer=require("nodemailer")

const adminLogin = async (req, res) => {
  const { adminId, adminPsw } = req.body;

  try {
    const admin = await adminModel.findOne({ adminId });

    if (!admin) {
      return res.status(401).send({ msg: "Invalid Admin Id" }); 
    }

    if (admin.adminPsw !== adminPsw) {
      return res.status(401).send({ msg: "Invalid Password" }); 
    }

  
    return res.status(200).send({
      admin: admin,
      msg: "Login Successfully!"
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send({ msg: "Server Error" });
  }
};
const createUser=async(req,res)=>{
  const {name,email,designation}=req.body;
  const usrPass=userPassword();
  const user= await userModel.create({
    name:name,
    email:email,
    designation:designation,
    password:usrPass
  })
  var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'aaliyakhan.01025@gmail.com',
      pass:'hqva csoa wmum tntk'
    }
  })
  var mailoptions={
    from:'aaliyakhan.01025@gmail.com',
    to:email,
    subject:'Sending Emails to users by Admin',
    text:`Welcome ${name}!\n
    Your Password:${usrPass} \n You can Login with this password `
  };
  transporter.sendMail(mailoptions,function(error,info){
    if(error){
      console.log(error)
    }
    else{
      console.log('Email Successfully Sent : ' + info.response);
      res.send(info.response)
    }
  })
}
const showUserData=async(req,res)=>{
  try{
    const user=await userModel.find()
    res.status(201).send(user)
  }
  catch(err){
    console.log(err)
  }
}

const assignTask=async(req,res)=>{
  const {title,description,complDay,userid,status}=req.body
  try{
    const task=await taskModel.create({
      title:title,
      description:description,
      complDay:complDay,
      userid:userid,
      status:status||"Pending"
    })
    res.status(201).send({msg:"User Task Successfully Assign"})
  }
  catch(err){
    console.log(err)
  }
}


const deleteTask=async(req,res)=>{
 const taskId = req.query.id
 console.log(taskId)
  try {
    const deletedTask = await taskModel.findByIdAndDelete(taskId)
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.status(200).json({ message: "Task deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}


 





const taskShow=async(req,res)=>{
  try{
const allTasks=await taskModel.find().populate("userid","name email")
const shortenTask=allTasks.map(task=>{
  const {_id,title,status,complDay}=task
  const {name,email}=task.userid
  return{
   _id,
        title,
        status,
        complDay,
        name,
        email, 
  }
})
res.status(200).send(shortenTask)
  }
  catch(err){
    console.log(err)
  }

}

const chngStatus=async(req,res)=>{
  const {id}=req.query
  console.log(req.query)
  try{
    const task=await taskModel.findByIdAndUpdate(id,{status:"Pending"})
      res.status(201).send("Succesfully updated!!!");
    } catch (error) {
       console.log(error);
    }
  }


  
module.exports = { adminLogin,createUser,showUserData,assignTask,taskShow ,chngStatus,deleteTask};
