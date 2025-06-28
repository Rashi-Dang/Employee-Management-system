import './App.css'
import EmployeeForm from './Component/EmployeeForm'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UpdateEmployee from './pages/UpdateEmployee'
import FrontPage from "./pages/FrontPage"
import Navbar from './Component/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Payroll from './Component/Payroll'
import Contact from './Component/ContactUs'


function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar /> 
    <Routes>
      <Route>
      <Route path="/" element={<FrontPage/>}/> {/* hero page */}
        <Route path="/home" element={<Home/>}/> {/* dashboard page */}
        <Route path="/form" element={<EmployeeForm/>}/>  {/* employee data add page */}
        <Route path="/update/:id" element={<UpdateEmployee/>}/>
        <Route path="/payroll" element={<Payroll />} /> {/* Payroll page */}
        <Route path="/contact" element={<Contact />} /> {/* Contact page */}
      </Route>
    </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      
    </BrowserRouter>
  
    </>
  )
}

export default App
