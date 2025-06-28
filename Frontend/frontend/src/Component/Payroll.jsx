import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Payroll.css";

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/payroll")
      .then((res) => {
        setPayrollData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching payroll data.");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Filter based on name or emp_id (case-insensitive)
  const filteredData = payrollData.filter((emp) =>
    (emp.name && emp.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (emp.emp_id && emp.emp_id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="payroll-container">
      <h1 className="title-payroll">Employee Payroll</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Name or Employee ID"
        className="search-bar"
        value={searchQuery}
        onChange={handleSearch}
      />

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Working Hours</th>  {/*  monthly */}
            <th>Bonus</th>
            <th>Total Pay</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((emp, index) => (
              <tr key={index}>
                <td>{emp.emp_id}</td>
                <td>{emp.name}</td>
                <td>{emp.salary}</td>
                <td>{emp.workingHours}</td>
                <td>{emp.bonus}</td>
                <td>{emp.totalPay}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payroll;
