// Node JS example using SQLite3
// With this example you can persist data in API services
// without a DBMS how MySQL, SQL Server, etc.

const sqlite3 = require('sqlite3').verbose(); // Instance with long-stack traces
const db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
}); // Creating database in-memory

db.serialize(async () => {
  db.run('CREATE TABLE IF NOT EXISTS users(name VARCHAR(255), description VARCHAR(255), age INT)'); // Creating table
  
  // Creating a user using Prepared Statement
  const stmt = db.prepare('INSERT INTO users(name, description) VALUES (?, ?)');
  stmt.run('Bedu Tech', 'Education-academy for developers');
  stmt.finalize();

  // Getting all rows
  db.each('SELECT * FROM users', (err, row) => {
    console.log(row.name, row.description);
  });
});

db.close(); // Closing database