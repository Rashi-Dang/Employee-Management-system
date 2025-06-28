// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const UpdateEmployee = () => {
//     const [employee, setEmployee] = useState({});
//     const {id} = useParams();

//     const fetchsingledata = async ()=>{
//         const res = await fetch(`${import.meta.env.VITE_URL}/getsingleemployee/${id}`);
//         const data = await res.json();
//         console.log(data);
//         setEmployee({...data.employeedata});
//     }
//     useEffect(()=>{
//         fetchsingledata();
//     },[]);

// // form validate and data 
  
//     const [errors, setErrors] = useState({});
  
//     const validateForm = () => {
//       const newErrors = {};
//       const phoneRegex = /^[0-9]{10}$/; // Simple regex for 10-digit phone number
  
//       if (!employee.emp_id) newErrors.emp_id = "Employee ID is required.";
//       if (!employee.name) newErrors.name = "Name is required.";
//       if (!employee.department) newErrors.department = "Department is required.";
//       if (!employee.designation) newErrors.designation = "Designation is required.";
//       if (!employee.phone) {
//         newErrors.phone = "Phone number is required.";
//       } else if (!phoneRegex.test(employee.phone)) {
//         newErrors.phone = "Phone number must be 10 digits.";
//       }
  
//       return newErrors;
//     };
  
//     const handleChange = (e) => {
//       setEmployee({
//         ...employee,
//         [e.target.name]: e.target.value
//       });
//     };

//     // update api call

//     const updatedata = async()=>{
//       const res = await fetch(`${import.meta.env.VITE_URL}/update`,{
//         method:"PUT",
//         body:JSON.stringify(employee),
//         headers:{
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       });
//       const data = await res.json();
//       console.log(data);
//     }
  
//     // submit function

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       const formErrors = validateForm();
  
//       if (Object.keys(formErrors).length === 0) {
//         console.log('Form Submitted:', employee);
//         alert('Form Updated successfully!');
//         updatedata();
//       } else {
//         setErrors(formErrors);
//       }
//     };


//   return (
//     <>
//     <Link to="/home" style={{textDecoration:"none",float:"left",backgroundColor: "#007bff",color:"white",borderRadius:"5px",padding:"8px 12px",marginLeft:"15px"}}><i class="fa-solid fa-arrow-left"></i> See Data</Link>
//        <div className="form-container">
//       <h2>Employee Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="emp_id">Employee ID:</label>
//         <input
//           type="text"
//           id="emp_id"
//           name="emp_id"
//           value={employee.emp_id}
//           onChange={handleChange}
//         />
//         {errors.emp_id && <p className="error">{errors.emp_id}</p>}

//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={employee.name}
//           onChange={handleChange}
//         />
//         {errors.name && <p className="error">{errors.name}</p>}

//         <label htmlFor="department">Department:</label>
//         <input
//           type="text"
//           id="department"
//           name="department"
//           value={employee.department}
//           onChange={handleChange}
//         />
//         {errors.department && <p className="error">{errors.department}</p>}

//         <label htmlFor="designation">Designation:</label>
//         <input
//           type="text"
//           id="designation"
//           name="designation"
//           value={employee.designation}
//           onChange={handleChange}
//         />
//         {errors.designation && <p className="error">{errors.designation}</p>}

//         <label htmlFor="phone">Phone:</label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           value={employee.phone}
//           onChange={handleChange}
//         />
//         {errors.phone && <p className="error">{errors.phone}</p>}

//         <button type="submit">Submit</button>
//       </form>
//     </div>  
//     </>
//   )
// }

// export default UpdateEmployee


import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import './UpdateEmployee.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    emp_id: '',
    name: '',
    department: '',
    designation: '',
    phone: '',
    salary: '',
    workingHours: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchsingledata = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/getsingleemployee/${id}`);
    const data = await res.json();
    console.log(data);
    setEmployee({ ...data.employeedata });
  };

  useEffect(() => {
    fetchsingledata();
  }, []);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!employee.emp_id) newErrors.emp_id = "Employee ID is required.";
    if (!employee.name) newErrors.name = "Name is required.";
    if (!employee.department) newErrors.department = "Department is required.";
    if (!employee.designation) newErrors.designation = "Designation is required.";
    if (!employee.salary) newErrors.salary = "Salary is required.";
if (!employee.workingHours) newErrors.workingHours = "Working hours are required.";
    if (!employee.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(employee.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const updatedata = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/update`, {
      method: "PUT",
      body: JSON.stringify(employee),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    // if (Object.keys(formErrors).length === 0) {
    //   console.log('Form Submitted:', employee);
    //   // alert('Form Updated successfully!');
    //   toast.success("Employee updated successfully!");
    //   updatedata();
    // } else {
    //   setErrors(formErrors);
    // }
    if (Object.keys(formErrors).length === 0) {
      try {
        await updatedata();
        toast.success("Employee updated successfully!");

        // Redirect after a short delay to allow toast to show
        setTimeout(() => {
          navigate("/home"); // ✅ redirect to dashboard
        }, 2000); // adjust time as needed
      } catch (error) {
        toast.error("Something went wrong while updating.");
        console.error(error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      {/* <Link to="/home" className="back-link">
        <i className="fa-solid fa-arrow-left"></i> See Data
      </Link> */}
      <div className="form-container">
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="emp_id">Employee ID:</label>
          <input
            type="text"
            id="emp_id"
            name="emp_id"
            value={employee.emp_id}
            onChange={handleChange}
          />
          {errors.emp_id && <p className="error">{errors.emp_id}</p>}

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={employee.department}
            onChange={handleChange}
          />
          {errors.department && <p className="error">{errors.department}</p>}

          <label htmlFor="designation">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
          />
          {errors.designation && <p className="error">{errors.designation}</p>}

          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label htmlFor="salary">Salary:</label>
<input
  type="number"
  id="salary"
  name="salary"
  value={employee.salary}
  onChange={handleChange}
/>
{errors.salary && <p className="error">{errors.salary}</p>}

<label htmlFor="workingHours">Working Hours:</label>
<input
  type="number"
  id="workingHours"
  name="workingHours"
  value={employee.workingHours}
  onChange={handleChange}
/>
{errors.workingHours && <p className="error">{errors.workingHours}</p>}

          <button type="submit" className="submit-btn">Update</button>
        </form>
      </div>
    </>
  );
};

export default UpdateEmployee;
