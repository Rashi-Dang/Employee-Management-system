// EmployeeForm.js
import React, { useState } from 'react';
import './EmployeeForm.css'; // External CSS file
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    emp_id: '',
    name: '',
    department: '',
    designation: '',
    phone: '',
    salary: '',
    workingHours: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/; // Simple regex for 10-digit phone number

    if (!formData.emp_id) newErrors.emp_id = "Employee ID is required.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.designation) newErrors.designation = "Designation is required.";
    if (!formData.salary) newErrors.salary = "Salary is required.";
    if (!formData.workingHours) newErrors.workingHours = "Working hours are required.";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // post request for sending data in database

  const callPostApi = ()=>{
     fetch(`${import.meta.env.VITE_URL}/create`,{
       method:'POST',
       // data json m convert hoga fr jaega 
       body:JSON.stringify(formData),
       headers:{
        'Content-type' : 'application/json; charsets=UTF-8',
       },
     }).then((res)=>res.json()).then((data)=>console.log(data))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      console.log('Form Submitted:', formData);
      // alert('Form submitted successfully!');
      toast.success("Employee added successfully!");
      callPostApi()
      setFormData({
        emp_id: '',
        name: '',
        department: '',
        designation: '',
        phone: '',
        salary:'',
        workingHours:''
      }); // Reset form after submission
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
    {/* <Link to="/home" className='see-data'><i class="fa-solid fa-arrow-left"></i> See Data</Link> */}

    <div className="form-container">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emp_id">Employee ID:</label>
        <input
          type="text"
          id="emp_id"
          name="emp_id"
          placeholder='Enter your Employee ID'
          value={formData.emp_id}
          onChange={handleChange}
        />
        {errors.emp_id && <p className="error">{errors.emp_id}</p>}

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
           placeholder='Enter your Name'
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
           placeholder='Enter your Department'
          value={formData.department}
          onChange={handleChange}
        />
        {errors.department && <p className="error">{errors.department}</p>}

        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          id="designation"
          name="designation"
           placeholder='Enter your designation'
          value={formData.designation}
          onChange={handleChange}
        />
        {errors.designation && <p className="error">{errors.designation}</p>}

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
           placeholder='Enter your Phone number'
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label htmlFor="salary">Salary:</label>
<input
  type="number"
  id="salary"
  name="salary"
  placeholder='Enter Salary'
  value={formData.salary}
  onChange={handleChange}
/>
{errors.salary && <p className="error">{errors.salary}</p>}

<label htmlFor="workingHours">Working Hours:</label>
<input
  type="number"
  id="workingHours"
  name="workingHours"
  placeholder='Enter Working Hours'
  value={formData.workingHours}
  onChange={handleChange}
/>
{errors.workingHours && <p className="error">{errors.workingHours}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default EmployeeForm;
