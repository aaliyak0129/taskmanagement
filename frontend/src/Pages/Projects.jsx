// import {useState, useEffect } from "react"
// import axios from "axios"
// import Table from "react-bootstrap/esm/Table"
// import BackendUrl from "../Config/BackendUrl"
// import tick from "../Images/checklist.png"
// import load from "../Images/time.png"
// import { MdDeleteForever } from "react-icons/md";
// import { MdEditDocument } from "react-icons/md";
// const Projects=()=>{
//     const [taskList,setTasklist]=useState([])
// const loadData=async()=>{
//     try{
//  let api=`${BackendUrl}allTasks`
//     const response=await axios.get(api)
//     console.log(response.data)
//     setTasklist(response.data)
//     }
//     catch(err){
//         console.log(err)
//     }
   
    
// }
// const chngStatus=async(id)=>{
// let api=`${BackendUrl}chngStatus/?id=${id}`
// try{
//   const response=await axios.get(api)
//   console.log(response)
// }
// catch(err){
//   console.log(err)
// }
// loadData()
// }


//     useEffect(()=>{
// loadData()
//     },[])
//      const headingStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     color: "#33ff33",
//     textShadow: "0 0 5px rgba(0,255,0,0.4)",

//   };
//   const containerStyle = {
//     padding: "20px",
//     background: "#121212",
//     minHeight: "100vh",
//     fontFamily: "Poppins, sans-serif",
//     color: "#c7c7c7",
//   };

//   const cardStyle = {
//     borderRadius: "20px",
//     background: "#1e1e1e",
//     padding: "20px",
//     boxShadow: "inset 4px 4px 8px #0a0a0a, inset -4px -4px 8px #2a2a2a",
//   };
//   const ans=taskList.map((key)=>{
//     return(
//         <>
//         <tr key={key._id}>
//            <td>{key.title}</td> 
//            <td>
//             <div className="icnImg">
//             {key.status==="complete"?(<><img src={tick}/><span style={{color:"#33ff33"}}>Complete</span></>):(<><img src={load} /><span style={{color:"red"}}>{key.status}</span></>)}</div></td>
//            <td>{key.complDay}</td>
//            <td>{key.name}</td>
//            <td>{key.email}</td>
//            <td>
//             <div className="icn">
//               {key.status==="complete"?(<button onClick={()=>{chngStatus(key._id)}} className="neon-login-btn reassignBtn">Reassign</button>):(<span style={{color:"red"}}>In Progress</span>)}
//            <MdEditDocument style={{color:"gray",fontSize:"23px"}}/>

//             <MdDeleteForever style={{color:"red",fontSize:"27px"}}/>
//             </div>
//            </td>

//         </tr>
//         </>
//     )
//   })
//     return(
//         <>
    
//        <div style={containerStyle}>
//         <h2 style={headingStyle}>Projects Alotted:</h2>
//         <div style={cardStyle}>
//           <Table variant="dark" striped bordered hover responsive>
//              <thead>
//             <tr>
//               <th>Task</th>
//               <th>Status</th>
//               <th>Deadline</th>
//               <th>User Name</th>
//               <th>User Email</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//             <tbody>
//              {ans}
//             </tbody>
//           </Table>

// </div>
// </div>
//         </>
//     )
// }
// export default Projects


import { useState, useEffect } from "react"
import axios from "axios"
import Table from "react-bootstrap/esm/Table"
import BackendUrl from "../Config/BackendUrl"
import tick from "../Images/checklist.png"
import load from "../Images/time.png"
import { toast, ToastContainer } from "react-toastify"
import { MdDeleteForever } from "react-icons/md"
import { MdEditDocument } from "react-icons/md"

const Projects = () => {
  const [taskList, setTasklist] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const loadData = async () => {
    try {
      let api = `${BackendUrl}allTasks`
      const response = await axios.get(api)
      setTasklist(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?")
    if (!isConfirmed) return

    try {
      const api = `${BackendUrl}deleteTask/?id=${id}`
      await axios.delete(api)
      toast.success("Task deleted successfully!")
      loadData()
    } catch (err) {
      console.log(err)
      toast.error("Failed to delete task!")
    }
  }

  const chngStatus = async (id) => {
    let api = `${BackendUrl}chngStatus/?id=${id}`
    try {
      await axios.get(api)
    } catch (err) {
      console.log(err)
    }
    loadData()
  }

  useEffect(() => {
    loadData()
  }, [])

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ff69b4",
    textShadow: "0 0 5px rgba(255,105,180,0.4)",
  }

  const containerStyle = {
    padding: "20px",
    background: "#fff6fa",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    color: "#333",
  }

  const cardStyle = {
    borderRadius: "20px",
    background: "#f3f8ff",
    padding: "20px",
    boxShadow: "4px 4px 12px #ffdbec, -4px -4px 12px #ffffff",
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTasks = taskList.slice(indexOfFirstItem, indexOfLastItem)

  const ans = currentTasks.map((key) => (
    <tr key={key._id}>
      <td>{key.title}</td>
      <td>
        <div className="icnImg">
          {key.status === "complete" ? (
            <>
              <img src={tick} alt="tick" />
              <span style={{ color: "#33cc66" }}>Complete</span>
            </>
          ) : (
            <>
              <img src={load} alt="loading" />
              <span style={{ color: "red" }}>{key.status}</span>
            </>
          )}
        </div>
      </td>
      <td>{key.complDay}</td>
      <td>{key.name}</td>
      <td>{key.email}</td>
      <td>
        <div className="icn">
          {key.status === "complete" ? (
            <button onClick={() => chngStatus(key._id)} className="neon-login-btn reassignBtn">Reassign</button>
          ) : (
            <span style={{ color: "red" }}>In Progress</span>
          )}
          <MdEditDocument style={{ color: "gray", fontSize: "23px" }} />
          <MdDeleteForever onClick={() => deleteTask(key._id)} style={{ color: "red", fontSize: "27px" }} />
        </div>
      </td>
    </tr>
  ))

  return (
    <>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Projects Alotted:</h2>
        <div style={cardStyle}>
          <Table striped bordered hover responsive style={{ backgroundColor: "#fff0f6", color: "#333" }}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ans}
            </tbody>
          </Table>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            {Array.from({ length: Math.ceil(taskList.length / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  margin: "5px",
                  padding: "5px 10px",
                  background: currentPage === index + 1 ? "#aad4ff" : "#ffdeeb",
                  color: "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "600",
                  boxShadow: "2px 2px 6px rgba(0,0,0,0.1)"
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Projects