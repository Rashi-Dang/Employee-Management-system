const Employee = require("../Model/Employee");

exports.updateEmployee = async (req,res)=>{

    try{
       const {emp_id,name,department,designation,phone,_id,salary,workingHours} = req.body

       const updateddata = await Employee.findByIdAndUpdate({_id:_id},
        {
            // key:value 
            emp_id:emp_id,
            name,
            department,
            designation,
            phone,
            salary,
            workingHours
        },{new:true}
       )
        return res.status(200).json({
            success:true,
            message:"data updated successfully",
            updateddata
        })
    }

    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error occured in updated data"
        })
    }
}