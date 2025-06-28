import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import { toast } from 'react-toastify'

const Home = () => {
  const [empdata, setEmpdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchalldata = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/getalldata`);
    const data = await res.json();
    setEmpdata(data.employee);
  }

  const calldeleteApi = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_URL}/deleteemployee/${id}`, {
      method: 'DELETE'
    });
    await res.json();
    fetchalldata();
  }

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    calldeleteApi(deleteId);
    setShowModal(false);
    toast.success("Employee deleted successfully!");
  };

  useEffect(() => {
    fetchalldata();
  }, []);

  const filteredData = empdata.filter((item) =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emp_id.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (departmentFilter === '' || item.department === departmentFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="home-container">
        <h1 className="title">Employee Data </h1>

        <input
          type="text"
          placeholder="Search by name or employee ID"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="department-filter"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
          <option value="IT">IT</option>
          <option value="Business">Business</option>
        </select>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Initials</th>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td data-label="Initials">
                  {item.avatar ? <img src={item.avatar} alt="avatar" className="avatar" /> : ""}
                </td>
                <td data-label="Employee ID">{item.emp_id}</td>
                <td data-label="Name">{item.name}</td>
                <td data-label="Department">{item.department}</td>
                <td data-label="Designation">{item.designation}</td>
                <td data-label="Phone">{item.phone}</td>
                <td data-label="Actions">
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                  <Link to={`/update/${item._id}`}>
                    <button className="edit-btn">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'pagination-button active' : 'pagination-button'}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this employee?</p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="modal-confirm" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home;

