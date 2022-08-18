const mysql = require("mysql2");
exports.db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "placement_nursing",
});
