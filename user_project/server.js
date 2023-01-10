const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const otpGenerator = require('otp-generator')

//middleware
app.use(bodyParser.json());

//  Database Connection
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'userProject',
});

//  Shows Mysql Connect
conn.connect(function (err) {
  if(err){
      console.log("error occurred while connecting");
  }
  else{
      console.log("connection created with Mysql successfully");
  }
});

// add user account 
app.post('/add-user-account',(req, res) => {
  const uniqueId = otpGenerator.generate(24, { upperCaseAlphabets: true, upperCaseAlphabets:true });
  // check user 18 year
  var dob = new Date(req.body.birth_date);  
  var month_diff = Date.now() - dob.getTime();  
  var age_dt = new Date(month_diff);   
  var year = age_dt.getUTCFullYear();  
  var age = Math.abs(year - 1970);  
  if(age<18){
    res.status(500).send({error : "You are not 18 year old"})
  }
  let data = {
    full_name: req.body.full_name, 
    birth_date: req.body.birth_date, email: req.body.email,
    unique_iD: uniqueId,
  };
    let sqlQuery = "INSERT INTO users SET ?";
    let query = conn.query(sqlQuery, data,(err, results) => {
      if(err) throw err;
      res.status(200).send(data);
    });
});

//get all user account 
app.get('/list-user-accounts',(req, res) => {
  let sqlQuery = "SELECT * FROM users WHERE activity_status!='archived'";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.status(200).send(results);
  });
});

//update user account
app.put('/update-user-account/:id/:email',(req, res) => {
  //  check user is active status
  let getActive = "SELECT * FROM users WHERE id=" + req.params.id;
  conn.query(getActive, (err, results) => {
    if(err) throw err;
    if(results[0].activity_status != "active"){
      res.status(500).send({error : "This account can not be update"})
    }
  });

  // check user is 18 year
  var dob = new Date(req.body.birth_date);  
  var month_diff = Date.now() - dob.getTime();  
  var age_dt = new Date(month_diff);   
  var year = age_dt.getUTCFullYear();  
  var age = Math.abs(year - 1970);  
  if(age<18){
    res.status(500).send({error : "You are not 18 year old"})
  }

  let sqlQuery = "UPDATE users SET full_name='"+req.body.full_name+"', birth_date='"+req.body.birth_date+"' WHERE email='"+req.params.email+"' AND id="+req.params.id;
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.status(200).send(results);
  });
});
  
//remove-user-account
app.put('/remove-user-account/:id',(req, res) => {
let getActive = "SELECT * FROM users WHERE id=" + req.params.id;
conn.query(getActive, (err, results) => {
  if(err) throw err;
  if(results[0].activity_status == "archived"){
    res.status(500).send({error : "This account can not be remove."})
  }
});

const activity_status = "archived"
let sqlQuery = "UPDATE users SET activity_status='"+activity_status+"' WHERE id="+req.params.id;
let query = conn.query(sqlQuery, (err, results) => {
  if(err) throw err;
  res.status(200).send(results);
});
});
  
//suspend-user-account
app.put('/suspend-user-account/:id',(req, res) => {
let getActive = "SELECT * FROM users WHERE id=" + req.params.id;
conn.query(getActive, (err, results) => {
  if(err) throw err;
  console.log(results[0].activity_status)
  if(results[0].activity_status != "active"){
    res.status(500).send({error : "This account can not be remove."})
  }
});
const activity_status = "suspended"
let sqlQuery = "UPDATE users SET activity_status='"+activity_status+"' WHERE id="+req.params.id;
let query = conn.query(sqlQuery, (err, results) => {
  if(err) throw err;
  res.status(200).send(results);
});
});
  
//reactivate-user-account
app.put('/reactivate-user-account/:id',(req, res) => {
let getActive = "SELECT * FROM users WHERE id=" + req.params.id;
conn.query(getActive, (err, results) => {
  if(err) throw err;
  console.log(results[0].activity_status)
  if(results[0].activity_status != "suspended"){
    res.status(500).send({error : "This account can not be reactivate."})
  }
});
const activity_status = "active"
let sqlQuery = "UPDATE users SET activity_status='"+activity_status+"' WHERE id="+req.params.id;
let query = conn.query(sqlQuery, (err, results) => {
  if(err) throw err;
  res.status(200).send(results);
});
});

  
//  Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});