const express = require("express");
const bodyParser= require("body-parser");
const cors= require("cors");
const app=express();
const mysql= require("mysql");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tigerchlm11#",
    database:"mydb"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/collect",(req,res)=>{
    var sql="SELECT * FROM studentList";
    con.query(sql,function(err,result){
        if (err) throw err;
        
        res.send(result);
       
    })
})
app.post("/create",(req,res)=>{
    
    const{firstName, lastName, location, email,date,month,year, education} = req.body;
    var sql="INSERT INTO studentList(firstName,lastName,location,email,dob,education)VALUES?";
    values=[
        [firstName,lastName,location,email,date+"/"+month+"/"+year,education]
    ]
     con.query(sql,[values],(err,result)=>{
        if (err) throw err;
    
        console.log("inserted");
     })
})
app.delete("/erase/:id",(req,res)=>{
    
    const{ id } = req.params;
    var sql="DELETE FROM studentList WHERE ID=?";
    
     con.query(sql,id,(err,result)=>{
        if (err) throw err;
        console.log("deleted");
     })
     var sql="ALTER TABLE studentList DROP ID"
  con.query(sql,function(err,rs){
       if (err) throw err;
    
  })
  var sql="ALTER TABLE studentList ADD COLUMN ID int AUTO_INCREMENT PRIMARY KEY"
  con.query(sql,function(err,rs){
       if (err) throw err;
       
  })
})
app.get("/collect/:id",(req,res)=>{
    
    const{ id } = req.params;
    var sql="SELECT * FROM studentList WHERE ID=?";
    con.query(sql,id,function(err,result){
        if (err) throw err;
        
        
        res.send(result);
       
    })
})
app.put("/update/:id",(req,res)=>{
    const{ id } = req.params;
    const{firstName, lastName, location, email,date,month,year, education} = req.body;

    var sql="UPDATE studentList SET firstName=?,lastName=?,location=?,email=?,dob=?,education=? WHERE ID=?";
    con.query(sql,[firstName,lastName,location,email,date+"/"+month+"/"+year,education,id],function(err,result){
        if (err) throw err;
        
        console.log("updated");
       
    })
})
// app.get('/search',function(req,res){
//     var firstName=req.query.firstName;
//    // var fn=firstName.charAt(0);
//     con.query("SELECT * FROM studentList WHERE firstName LIKE '"+fn+"%'",(err,rs)=>{
//       if (err) throw err;
//     console.log(rs);
//   res.send(rs);
//     })
//   })

app.listen(3001,()=>{
    console.log("server is running at port 3001");
})