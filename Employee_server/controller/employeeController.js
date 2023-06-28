const Employee = require("../models/employeeModel");

exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log({ id });
    const employee = await Employee.findById({ _id: id });
    console.log(employee);
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employes not found!!", employee: employee });
    }

    return res
      .status(200)
      .json({ message: "1 Employee found!!", employee: employee });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Could not find this employee", error: error.message });
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      { _id: id },
      { name: name, email: email, phone: phone },
      { new: true }
    );
    console.log(employee);
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Couldnt Update Employee!!", employee: employee });
    }

    return res
      .status(201)
      .json({ message: "Employee Updated!!", employee: employee });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Could not find this employee", error: error.message });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findByIdAndRemove({ _id: id });
    console.log(employee);
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Couldnt Remove Employe!!", employee: employee });
    }

    return res
      .status(200)
      .json({ message: "Employee Removed!!", employee: employee });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Could not find this employee", error: error.message });
  }
};
exports.getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find({});
    if (!employees) {
      return res
        .status(404)
        .json({ message: "Employess not found!!", employees: employees });
    }

    return res
      .status(200)
      .json({ message: "Employess found!!", employees: employees });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Could not find employess", error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const employeeExist = await Employee.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (employeeExist) {
      return res
        .status(422)
        .json({ error: "Email or Phone number already exist" });
    }

    const employee = new Employee({
      name,
      email,
      phone,
    });

    // employee.password = undefined;
    const saveEmployee = await employee.save();
    return res.status(201).json({
      message: "User registered succesfully",
      employee: saveEmployee,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not register user", error: err.message });
  }
};
