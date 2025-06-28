const Employee = require("../Model/Employee")

exports.getAllEmployee = async(req,res)=>{
    try{
       const employee = await Employee.find({});

       res.status(200).json({
        message:"employee data fetched successfully", employee,
        success:true
       });
    }
    catch(error){
       res.status(500).json({
        message:error.message + "data not fetched",
        success:false
       });
    }
}



// get single employee

exports.getSingleEmployee = async(req,res)=>{
   try{
     const id = req.params.id
     const employeedata = await Employee.findOne({_id:id})

     res.status(200).json({
      message:"employee data fetched successfully",
      employeedata,
      success:true
      });
   }
   catch(error){
     res.status(500).json({
      message:error.message + "data not fetched",
      success:false
     });
   }
}