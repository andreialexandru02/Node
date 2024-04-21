const express = require('express'); 
const app = express(); 
const db = require('./db');
  
app.get('/data', (req, res) => {
    db.all('SELECT * FROM Post', (err, rows) => {
        if (err) {
            res.status(500).send('Error querying the database');
        } else {
            res.json(rows);
        }
    });
});

app.get("/" , (req , res) => { 
    res.send("GeforGeeks"); 
}) 
  
// Server Running 
app.listen(4000 , () => { 
    console.log("Server started"); 
})