const mysql = require("mysql");

const connection = mysql.createConnection({
    // host:'sql6.freemysqlhosting.net',
    // user:'sql6583283',
    // password:'gTGQA5gwAV',
    // database:'sql6583283',
    // port: "3306"
    host:'localhost',
    user:'root',
    password:'',
    database:'pet-sync-database1'
});

connection.connect((err)=>{
    if(err)
    {
        console.log("Database Connection Failed!");
        console.log(err);
    }
    else
    {
        console.log("Database Connected!");
    }
});

module.exports = connection;