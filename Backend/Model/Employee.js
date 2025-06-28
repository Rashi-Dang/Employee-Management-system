const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    emp_id:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    salary: {
        type: Number,
        default: 0  ,
        required:true
    },
      workingHours: {
        type: Number,
        required:true,
        default: 160  // Assuming 160 hours/month is base
    }
});

module.exports= mongoose.model("Employee", employeeSchema);