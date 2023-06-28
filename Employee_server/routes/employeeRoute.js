const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");

router.get("/getEmployee/:id", employeeController.getEmployeeById);
router.get("/getEmployees", employeeController.getAllEmployee);
router.post("/create", employeeController.createEmployee);
router.put("/updateEmployee/:id", employeeController.updateEmployeeById);
router.delete("/deleteEmployee/:id", employeeController.deleteEmployeeById);

module.exports = router;
