const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error(
      "Warning:",
      "Failed to get a DB connection.",
      "Did you create a .env file with valid credentials?",
      "Routes using models won't work as intended"
    );
  }
  // eslint-disable-next-line no-restricted-syntax
  console.log("Connection to database established. Happy coding!");
});

module.exports = connection;
