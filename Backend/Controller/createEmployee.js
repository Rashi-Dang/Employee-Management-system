const Employee = require("../Model/Employee")

exports.createEmployee = async(req,res)=>{
    try{
       const {name,emp_id,designation,department,phone,salary,workingHours}=req.body;

       const employee = await Employee.create({name,emp_id,designation,department,phone,salary,workingHours,
         avatar:`https://api.dicebear.com/9.x/initials/svg?seed=${name}`
      })

       res.status(200).json({
        message:"employee create successfully", employee,
        success:true
       });
    }
    catch(error){
       res.status(500).json({
        message:error.message + "internal server error",
        success:false
       });
    }
}