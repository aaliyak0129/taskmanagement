import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navDashStyle = {
    background: "#ffe9f3",
    color: "#333",
    padding: "20px",
    boxShadow: "inset 3px 3px 6px #ffd6ea, inset -3px -3px 6px #ffffff",
    borderBottom: "1px solid #ffc4de",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px"
  };

  const arrngStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const logoutBtnStyle = {
    background: "#fff0f6",
    color: "#ff69b4",
    border: "1px solid #ff69b4",
    padding: "10px 20px",
    borderRadius: "12px",
    boxShadow: "0 0 5px rgba(255,105,180,0.3), 0 0 10px rgba(255,105,180,0.2)",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const sectionStyle = {
    display: "flex",
    height: "calc(100vh - 80px)",
    background: "#f3f7fc",
    color: "#333"
  };

  const leftStyle = {
    width: "250px",
    background: "#e6f2ff",
    padding: "20px",
    boxShadow: "inset 4px 4px 8px #cde6ff, inset -4px -4px 8px #ffffff",
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px"
  };

  const rightStyle = {
    flex: 1,
    padding: "20px",
    background: "#fff6fa",
    overflowY: "auto"
  };

  const ulStyle = {
    listStyle: "none",
    padding: 0
  };

  const liStyle = {
    padding: "12px 20px",
    margin: "12px 0",
    background: "#fff0f6",
    borderRadius: "10px",
    boxShadow: "4px 4px 8px #ffd6ea, -4px -4px 8px #ffffff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#2196f3",
    fontWeight: "600"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#2196f3",
    display: "block"
  };

  return (
    <>
      <div className="navDash" style={navDashStyle}>
        <div className="arrng" style={arrngStyle}>
          <h5>Welcome : Admin , {localStorage.getItem("adminUsr")}</h5>
          <button onClick={logout} style={logoutBtnStyle} className="neon-login-btn logout">
            Logout
          </button>
        </div>
      </div>
      <section id="divideDash" style={sectionStyle}>
        <div id="left" style={leftStyle}>
          <ul style={ulStyle}>
            <li style={liStyle}>Overview</li>
            <li style={liStyle}><Link to="createUser" style={linkStyle}>Create User</Link></li>
            <li style={liStyle}><Link to="assignTask" style={linkStyle}>Assign Task</Link></li>
            <li style={liStyle}><Link to="allTasks" style={linkStyle}>Projects</Link></li>
            <li style={liStyle}>Services</li>
            <li style={liStyle} onClick={logout}>Logout</li>
          </ul>
        </div>
        <div id="right" style={rightStyle}>
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Dashboard;