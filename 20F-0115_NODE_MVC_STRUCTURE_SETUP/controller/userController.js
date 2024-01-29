const { getUsers ,formSubmit,updateEmployee,deleteEmployee} = require("../model/userModel");
// controller function to get users its hit model and get data in data array and then render on ejs html
exports.getUsers = async (req, res) => {
    let data = [];
    try {
      data = await getUsers();
      res.render("show",{users:data});
      // res.json({ msg: "success", data: data });
    } catch (error) {
      res.json({ msg: error, data: [] });
    }
  };