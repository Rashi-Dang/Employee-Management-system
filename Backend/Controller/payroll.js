const Employee = require("../Model/Employee");

const getPayroll = async (req, res) => {
  try {
    // Fetch all employees
    const employees = await Employee.find();

    // Log to check employee data (for debugging)
    console.log("Employee data:", employees);

    // Generate payroll information
    const payroll = employees.map(emp => {
      const baseHours = 160; // Standard working hours
      const ratePerHour = 100; // Hourly rate for bonus calculation

      // Check if emp.workingHours is available, else default to 0
      const workingHours = emp.workingHours || 0;

      // Calculate bonus based on extra working hours
      const extraHours = workingHours - baseHours;
      const bonus = extraHours > 0 ? extraHours * ratePerHour : 0;

      // Calculate total pay
      const totalPay = (emp.salary || 0) + bonus;

      return {
        emp_id: emp.emp_id,  
        name: emp.name,
        salary: emp.salary,
        workingHours: workingHours,
        bonus,
        totalPay
      };
    });

    // Send payroll data as response
    res.status(200).json(payroll);
  } catch (err) {
    console.error("Error generating payroll:", err);  // Log the error for debugging
    res.status(500).json({ error: "Failed to generate payroll" });
  }
};

module.exports = { getPayroll };
