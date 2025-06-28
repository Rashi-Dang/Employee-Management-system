const Employee = require("../Model/Employee")

exports.deleteEmployee = async(req,res)=>{

    try{
        // url se nikal re h to params hi hoga
       const {id} = req.params
       const deletedemployee = await Employee.findByIdAndDelete(id);
       if(!deletedemployee){
        return res.status(404).json({
            message:"employee not found",
            success:false
        });
       }
       return res.status(200).json({
        success:true,
        message:"employee deleted successfully",
        deletedemployee
       })

    }
    catch(error){
        res.status(500).json({
            message:error.message,
            success:false,
            msg:"cannot find employee"
        });
    }
}