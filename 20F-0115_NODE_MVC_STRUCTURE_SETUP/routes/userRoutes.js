const router = require("express").Router(); // router for routes provided by express
const {getUsers} = require("../controller/userController"); // here getting the controller


router.route("/getUsers").get(getUsers);  // get post put you can use anything here and we passed the controller function in using
//using usercontroller

module.exports = router;