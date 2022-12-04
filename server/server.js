const express = require('express');
const multer = require('multer');
const database = require('better-sqlite3');
const cors = require('cors');
const { json } = require('body-parser');

const port = 3333;
const app = express();
const upload = multer();
app.use(cors({origin:'*'}));
app.use(express.json());

const db = new database('./database/Chinook_Sqlite.sqlite');

app.post('/customer',upload.none(),(req, res)=>{
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const sql = "INSERT INTO Customer(FirstName, LastName, Email) VALUES(?,?,?)";
    const statement = db.prepare(sql);
    const result = statement.run([req.body.FirstName, req.body.LastName, req.body.Email]);
    res.json(result);
});

app.get('/customer',(req,res)=>{

    const sql = "SELECT * FROM Customer";
    const statement = db.prepare(sql);
    const result = statement.all();
    res.json(result);
});

app.put('/customer/:id', (req, res) => {

    const sql = "UPDATE Customer SET FirstName=?, LastName=?,Email=? WHERE CustomerId=?";
    const statement = db.prepare(sql);
    const result = statement.run([req.body.FirstName, req.body.LastName, req.body.Email, req.params.id]);
    res.json(result);
});

app.listen(port,()=>console.log('listening on port', port));