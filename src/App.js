import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Form, Container, Button, Dropdown } from "react-bootstrap";
import studentsData from "./data";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedToDate, setSelectedToDate] = useState("");
  const [students, setStudents] = useState(studentsData);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBranchFilter = (branch) => {
    setSelectedBranch(branch);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleFromDateChange = (e) => {
    setSelectedFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setSelectedToDate(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const filteredAndSortedStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) =>
      selectedBranch !== "" ? student.branch === selectedBranch : true
    )
    .filter((student) =>
      selectedStatus !== "" ? student.status === selectedStatus : true
    )
    .filter((student) =>
      selectedFromDate !== "" && selectedToDate !== ""
        ? new Date(student.date) >= new Date(selectedFromDate) &&
          new Date(student.date) <= new Date(selectedToDate)
        : true
    );

  return (
    <Container className="mt-3">
      <h1 className="mb-4">Student Data</h1>
      <h2>Total({studentsData.length})</h2>
      <Form className="mb-3">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form className="mb-3" style={{ flex: 1, marginRight: "10px" }}>
          <Form.Group controlId="branchFilter">
            <Dropdown>
              <Dropdown.Toggle variant="primary">
                Branch Filter: {selectedBranch || "All"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleBranchFilter("")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleBranchFilter("Main Branch")}
                >
                  Main Branch
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleBranchFilter("Downtown Branch")}
                >
                  Downtown Branch
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleBranchFilter("Uptown Branch")}
                >
                  Uptown Branch
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group controlId="statusFilter">
            <Dropdown>
              <Dropdown.Toggle variant="warning">
                Status Filter: {selectedStatus || "All"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleStatusFilter("")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Approved")}>
                  Approved
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Pending")}>
                  Pending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleStatusFilter("Rejected")}>
                  Rejected
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Form>
        <Form className="mb-3" style={{ flex: 1 }}>
          <Form.Group controlId="fromDateFilter">
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              placeholder="From Date"
              value={selectedFromDate}
              onChange={handleFromDateChange}
            />
          </Form.Group>
          <Form.Group controlId="toDateFilter">
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              placeholder="To Date"
              value={selectedToDate}
              onChange={handleToDateChange}
            />
          </Form.Group>
        </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Branch</th>
            <th>Amount</th>
            <th>Bank</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.date}</td>
              <td>{student.branch}</td>
              <td>{student.amount}</td>
              <td>{student.bank}</td>
              <td>{student.name}</td>
              <td>{student.status}</td>
              <td>
                <Button
                  variant="white"
                  onClick={() => handleDelete(student.id)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3807/3807871.png"
                    alt="delete"
                    width="20px"
                    height="20px"
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
