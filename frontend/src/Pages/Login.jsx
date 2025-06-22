import Button from 'react-bootstrap/Button';
import axios from "axios"
import { useState } from 'react';
import { InputGroup,Form} from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import BackendUrl from '../Config/BackendUrl';
const Login=()=>{
const [adminId,setAdminid]=useState("")
const[adminPsw,setAdminpsw]=useState("")
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      let api=`${BackendUrl}loginchk`
      const response=await axios.post(api,{adminId:adminId,adminPsw:adminPsw})
      console.log(response)
      localStorage.setItem("adminUsr",response.data.admin.name)
      navigate("dashboard")
    }
    catch(err){
      console.log(err)
     
    }

   
   
  }
    return(
        <>
       
        <div className='formCover'>
<h1 class="vertical-login-css">LOGIN</h1>

           
        <Form className='myForm'>
      <InputGroup className="mb-3">
  <InputGroup.Text className='inptxt'>
    <MdEmail className='env'/>
  </InputGroup.Text>
  <Form.Control
    type="email"
    value={adminId}
    onChange={(e)=>{setAdminid(e.target.value)}}
    placeholder="Enter email"
    className="email"
  />
</InputGroup>
        <Form.Text className="txt">
          We'll never share your email with anyone else.
        </Form.Text>
     
      <InputGroup>
  <InputGroup.Text className='inptxt2'>
    <RiLock2Fill className='env'/>
  </InputGroup.Text>
  <Form.Control
    type="password"
    value={adminPsw}
    onChange={(e)=>{setAdminpsw(e.target.value)}}
    placeholder="Enter Password"
    className="psw"
  />
</InputGroup>
      
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" className='text-white chk'/>
      </Form.Group>
      <Button className='login' type="submit" onClick={handleSubmit}>
       Login
      </Button>
    </Form>
      </div>
        </>
    )
}
export default Login