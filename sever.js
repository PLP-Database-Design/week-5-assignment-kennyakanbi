// express frame work -- use to handle http request
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

//Confogures the install packages
app.use(express.json());
app.use(cors());
dotenv.config();

//connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

//check if there is connection
db.connect((err) => {
    //if no connect
    if(err) return console.log("Error connecting to MYSQL");
    
    //if connection works successfully
    console.log("Connected to mysql as id: ", db.threadId);
})

// < Codes goes dow here.
app.set('View Engine', 'ejs');
app.set('Views', __dirname + '/views');

//Data .ejs is in view folder
app.get('/data', (req, res) => {

// Qiestion 1. Retrive data from all Patients
db.query('SELECT * FROM patients', (err, results) => {
    if (err){
        console.error(err);
        res.status(500).send('Error Retriving Data')

    }else {
        //Display the record to the browser
        res.render('data', {results: results});
    }
});
});
//Questions 2. Retrive data from all Providers
db.query('SELECT * FROM providers', (err, results) => {
    if (err){
        console.error(err);
        res.status(500).send('Error Retriving Data')

    }else {
        //Display the record to the browser
        res.render('data', {results: results});
    }
});
});
// Qiestion 3. Filter by first name
db.query('SELECT first nsme FROM patients', (err, results) => {
    if (err){
        console.error(err);
        res.status(500).send('Error Filtring Data')

    }else {
        //Display the record to the browser
        res.render('data', {results: results});
    }
});
});
// Qiestion 4. Retrive all providers by speciality
db.query('SELECT proverder_speciality FROM providers', (err, results) => {
    if (err){
        console.error(err);
        res.status(500).send('Error Retriving Data')

    }else {
        //Display the record to the browser
        res.render('data', {results: results});
    }
});
});
//Codes goes up here.

//start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

//send message to browser
    console.log('sending message to browser....')    
    app.get('/', (req,res) => {
         res.send('server started successfully');
});
});
