const express = require("express");
const router = express.Router();

const {createEmployee} = require("../Controller/createEmployee");
const {getAllEmployee, getSingleEmployee} = require("../Controller/getallemployee");
const {deleteEmployee} = require("../Controller/deleteEmployee");
const { updateEmployee } = require("../Controller/updateEmployee");
const { getPayroll } = require("../Controller/payroll");


router.post("/create",createEmployee);
router.get("/getalldata", getAllEmployee);
router.delete("/deleteemployee/:id", deleteEmployee);
router.put("/update",updateEmployee);
router.get("/getsingleemployee/:id", getSingleEmployee);
router.get("/payroll", getPayroll);

module.exports= router;