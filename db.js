
const sqlite3 = require('sqlite3'); 
// Specify the path to the database file
const dbPath = "C:/Users/Asus/Desktop/FACULTATE/FACULTATE ANUL3 SEM2/SQLiteNode/NodeProject.db";

// Open the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening the database:', err.message);
    } else {
        console.log('Connected to the database:', dbPath);
    }
});

module.exports = db;