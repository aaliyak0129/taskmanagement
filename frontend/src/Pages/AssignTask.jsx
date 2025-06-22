import { useState, useEffect } from "react";
import BackendUrl from "../Config/BackendUrl";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AssignTask = () => {
  const [mydata, setMydata] = useState([]);
  const [input, setInput] = useState([]);
  const [show, setShow] = useState(false);
  const [userid, setUserid] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (uid) => {
    setUserid(uid);
    setShow(true);
  };

  const loadData = async () => {
    let api = `${BackendUrl}showUserData`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendUrl}assignTask`;
    try {
      await axios.post(api, { ...input, userid });
      setShow(false);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  // 🎨 Styling for Rose Pink & Baby Blue theme
  const containerStyle = {
    padding: "20px",
    background: "#fff6fa",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    color: "#333",
  };

  const cardStyle = {
    borderRadius: "20px",
    background: "#fff0f6",
    padding: "20px",
    boxShadow: "inset 4px 4px 8px #ffd6ea, inset -4px -4px 8px #ffffff",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ff69b4",
    textShadow: "0 0 3px #ff99cc",
  };

  const modalBodyStyle = {
    background: "#ffeef5",
    color: "#333",
  };

  let sno = 0;
  const ans = mydata.map((key) => {
    sno++;
    return (
      <tr key={key._id}>
        <td>{sno}</td>
        <td>{key.name}</td>
        <td>{key.email}</td>
        <td>{key.designation}</td>
        <td><button onClick={() => { handleShow(key._id) }} className="neon-login-btn">Assign Task</button></td>
      </tr>
    );
  });

  return (
    <>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Assign Task To User</h2>
        <div style={cardStyle}>
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#ffcce5" }}>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Work</th>
              </tr>
            </thead>
            <tbody>
              {ans}
            </tbody>
          </Table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton style={{ background: "#ffe9f3" }}>
            <Modal.Title style={headingStyle}>Assign Task</Modal.Title>
          </Modal.Header>
          <Modal.Body style={modalBodyStyle}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter Task Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleInput}
                  className="neon-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Enter Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  onChange={handleInput}
                  className="neon-input"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Completion Days:</Form.Label>
                <Form.Control
                  type="text"
                  name="complDay"
                  onChange={handleInput}
                  className="neon-input"
                />
              </Form.Group>
              <button type="submit" onClick={handleSubmit} className="neon-login-btn">
                Submit
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AssignTask;
