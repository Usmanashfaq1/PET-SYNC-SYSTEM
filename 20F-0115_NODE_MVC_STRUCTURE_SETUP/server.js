const express = require("express");
const path = require("path");
const { promisify } = require("util");
const app = express();
if (process.env.NODE_ENV !== "production") 
{
  require("dotenv").config();
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var flash = require("connect-flash");
//using express-session
app.use(
  require("express-session")({
    secret: "This is secret",
    resave: false,
    
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(function (req, res, next) {
  res.locals.message = req.flash();
  next();
});

const Users = require("./routes/userRoutes"); //here we are using routes using variable Users


app.use("/api/v1/", Users);  //here we are making api url  this is the original link which is going to hit

PORT = process.env.PORT || 8085;
app.listen(PORT, function () {
  console.log(`Server is listening at port ${PORT}`);
});