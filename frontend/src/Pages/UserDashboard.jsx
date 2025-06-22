import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navDashStyle = {
    background: "#ffe9f3",
    color: "#333",
    padding: "20px",
    borderBottom: "2px solid #ffcce5",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px"
  };

  const arrngStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const logoutBtnStyle = {
    background: "#ff69b4",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    boxShadow: "0 0 8px rgba(255, 105, 180, 0.5)",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const sectionStyle = {
    display: "flex",
    height: "calc(100vh - 80px)",
    background: "#fff6fa",
    color: "#333"
  };

  const leftStyle = {
    width: "250px",
    background: "#e6f2ff",
    padding: "20px",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.05)"
  };

  const rightStyle = {
    flex: 1,
    padding: "20px",
    background: "#fff0f6",
    overflowY: "auto"
  };

  const ulStyle = {
    listStyle: "none",
    padding: 0
  };

  const liStyle = {
    padding: "12px 20px",
    margin: "12px 0",
    background: "#fce4ec",
    borderRadius: "10px",
    boxShadow: "2px 2px 5px #ffd6ea",
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: "#ff69b4",
    fontWeight: "500"
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    display: "block"
  };

  return (
    <>
      <div className="navDash" style={navDashStyle}>
        <div className="arrng" style={arrngStyle}>
          <h5>Welcome : User, {localStorage.getItem("username")}</h5>
          <button onClick={logout} style={logoutBtnStyle}>LOGOUT</button>
        </div>
      </div>

      <section id="divideDash" style={sectionStyle}>
        <div id="left" style={leftStyle}>
          <ul style={ulStyle}>
            <li style={liStyle}><Link to="#" style={linkStyle}>User Overview</Link></li>
            <li style={liStyle}><Link to="task" style={linkStyle}>My Tasks</Link></li>
            <li style={liStyle}><Link to="#" style={linkStyle}>Projects</Link></li>
            <li style={liStyle}><Link to="#" style={linkStyle}>Reports</Link></li>
            <li style={liStyle}><Link to="#" style={linkStyle}>Services</Link></li>
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

export default UserDashboard;
