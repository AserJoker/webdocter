const express = require('express')
const mysql = require('mysql')
const app = express();
const connection = mysql.createConnection({
    host:"localhost",
    user:"webserver",
    password:"webserver_password",
    database:"webdocter"
})
connection.connect();
app.use(express.static('src'));
app.get('/reg-req',(req,res)=>{
    let result = {code:0};
    connection.query('select * from docters',(e,r,f)=>{
        if(e) throw e;
        if(r.length != 0){
            result.code = 1;
            res.end(JSON.stringify(result));
        }
        connection.query(`insert into docters values('${req.query.Name}','${req.query.Email}','${req.query.Password}')`,(e,r,f)=>{
            if(e) throw e;
            res.end(JSON.stringify(result));
        });
    });
});
app.get('/login-req',(req,res)=>{
    let result = {code:0,user:{Name:'',Email:''}};
    connection.query(`select * from docters where email='${req.query.Email}';`,(e,r,f)=>{
        if(e) throw e;
        if(r.length == 0||r[0].password!=req.query.Password){
            result.code = 1;
            res.end(JSON.stringify(result));
        }
        result.user.Name = r[0].name;
        result.user.Email = r[0].email;
        res.end(JSON.stringify(result));
    });
});
app.listen(8080,()=>{
    console.log('server start');
})