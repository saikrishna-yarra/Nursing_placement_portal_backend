const express = require("express");
const router = express.Router();
const { StudentDetails } = require("../models");
const { db } = require("../util/db");
const excelController = require("../controllers/excel.controller");
const upload = require("../middleware/upload");

router.post("/upload", upload.single("file"), excelController.upload);
router.get("/studentDetails", excelController.getStudentDetails);

router.get("/load_student_details", async (req, res) => {
  //   const listOfStudents = await StudentDetails.findAll();
  //   res.json(listOfStudents);
  db.query("SELECT * FROM student_details", (err, data, fields) => {
    return res.json({
      data,
    });
  });
});

router.post("/", async (req, res) => {
  const student = req.body;
  await StudentDetails.create(student);
  res.json(student);
});

router.post("/parseExcell", async (req, res) => {
  const student = req.body;
  await StudentDetails.create(student);
  res.json(student);
});

router.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  //username = username.toLowerCase();
  //password = password.toLowerCase();
  if (username.length > 12 || password.length > 12) {
    res.json({
      success: false,
      msg: "An Error Occured, Please Try Again",
    });
    return;
  }
  let cols = [username];
  db.query(
    "SELECT * FROM Studentdetails WHERE username=? LIMIT 1",
    cols,
    (err, data, fields) => {
      if (err) {
        res.json({
          success: false,
          msg: "Username Doesnot Exists",
        });
        return;
      }
      if (data && data.length === 1) {
        if (password === data[0].student_number) {
          res.json({
            success: true,
            roles: "2001",
            accessToken: data[0].username,
          });
          accessToken: data[0].username;
          return;
        } else {
          res.json({
            success: false,
            msg: "Please Try again Password Incorrect",
          });
        }
      } else {
        res.json({
          success: false,
          msg: "User Doesnot Exist, Please Try Again",
        });
      }
    }
  );
});

router.post("/addStudentsInfo", (req, res) => {
  var cols = req.body;
  var sql =
    "INSERT INTO student_details (first_name, last_name, student_number,username, email) VALUES ?";
  db.query(sql, [cols], (err, data, fields) => {
    res.json({
      msg: "New Students details have been added to the database",
    });
    return;
  });
});

router.get("/load_placement_locations", async (req, res) => {
  //   const listOfStudents = await StudentDetails.findAll();
  //   res.json(listOfStudents);
  db.query("SELECT * FROM placementlocation", (err, data, fields) => {
    return res.json({
      data,
    });
  });
});

router.get("/load_available_slots", async (req, res) => {
  //   const listOfStudents = await StudentDetails.findAll();
  //   res.json(listOfStudents);
  db.query(
    "SELECT location_name, available_slots FROM placementlocation",
    (err, data, fields) => {
      return res.json({
        data,
      });
    }
  );
});

router.get("/load_available_slots", async (req, res) => {
  //   const listOfStudents = await StudentDetails.findAll();
  //   res.json(listOfStudents);
  db.query(
    "SELECT location_name, available_slots FROM placementlocation",
    (err, data, fields) => {
      return res.json({
        data,
      });
    }
  );
});

router.post("/updatePlacement", (req, res) => {
  var cols = req.body;
  let location = req.body.location;
  let studentNumber = req.body.student_number;
  let value = [location, studentNumber];

  var placementflag =
    "SELECT selectedLocation FROM student_details WHERE student_number =?";
  var flagSQL =
    "Select available_slots from placementlocation WHERE location_name = ? ";
  var updateSql =
    "UPDATE student_details SET selectedLocation = ?" +
    "WHERE student_number = ?";
  var slotDecrement =
    "UPDATE placementlocation SET available_slots = available_slots - 1 WHERE location_name =? ";

  db.query(placementflag, value.studentNumber, (err, data, fields) => {
    console.log(data);
  });
  //     if (true) {
  db.query(flagSQL, value[0], (err, data, fields) => {
    console.log(data);
    if (data[0].available_slots > 0) {
      console.log("if statement");
      db.query(slotDecrement, value, (err, data, fields) => {
        console.log(data);
      });
      db.query(updateSql, value, (err, data, fields) => {
        console.log(data);
        res.json({
          msg: "Students details have been updated",
        });

        return;
      });
    } else {
      res.json({
        msg: "NO SLOTS AVAILABLE",
      });
    }
  });
  //     } else {
  //       res.json({
  //         msg: "Students has already been placed",
  //       });
  //     }
  //   });
});

module.exports = router;
