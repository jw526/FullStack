const express = require('express');
const multer = require('multer');
const database = require('better-sqlite3');

const port = 3333;
const app = express();
const upload = multer();

const db = new database('./database/Chinook_Sqlite.sqlite');

app.post('/customer',upload.none(),(req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const sql = "INSERT INTO Customer(FirstName, LastName, Email) VALUES(?,?,?)";
    const statement = db.prepare(sql);
    const result = statement.run([req.body.FirstName, req.body.LastName, req.body.Email]);
    res.json(result);
});

app.get('/customer',(req,res)=>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    const sql = "SELECT * FROM Customer";
    const statement = db.prepare(sql);
    const result = statement.all();
    res.json(result);
});

app.listen(port,()=>console.log('listening on port', port));