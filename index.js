const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// admin controllers
const { addStudent } = require("./controllers/admin");
//const db = require("./util/db");
const db = require("./models");
const mysql = require("mysql2");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const Router = require("./Router");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/load_student_details", (req, res) => {
//   const sqlGet = "SELECT * FROM student_details";
//   db.query(sqlGet, (error, result) => {
//     if (error) {
//       res.error(error.message);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.get("/", (req, res) => {
//   const sqlInsert =
//     "Insert into student_details(first_name, last_name, student_number,id) values ('sena', 'John', '12346', 2)";
//   db.query(sqlInsert, (error, result) => {
//     console.log("error", error);
//     console.log("result", result);
//     res.send("Hello Express");
//   });
// });

app.get("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM student_details WHERE email = ? AND student_number = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
        console.log("database");
      } else {
        res.send({ message: "Wrong username/password" });
      }
    }
  );
});

app.post("/api/addStudent", addStudent);

//Routers
const postRouter = require("./routes/Routes");
app.use("/Routes", postRouter);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port - 5000");
  });
});

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "placement_nursing",
// });

// db.connect(function (err) {
//   if (err) {
//     console.log("DB ERROr");
//     throw err;

//     return false;
//   } else {
//     console.log("Connected");
//   }
// });

// const sessionStore = new MySQLStore(
//   {
//     expiration: 1825 * 86400 * 1000,
//     endConnectionOnClose: false,
//   },
//   db
// );

// app.use(
//   session({
//     key: "bkjgbhjdgfjs",
//     secret: "sagjfguy4yret384",
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1825 * 86400 * 1000,
//       httpOnly: false,
//     },
//   })
// );

// new Router(app, db);
//app.options("*", cors());
// app.get('/',cors(corsOptions),function(req,res){
//     res.sendFile(path.join(__dirname,'build','index.html'));
// });
//app.listen(5000);
