const { db } = require("../util/db");
const { validateUserData } = require("../util/validators");
exports.addStudent = (req, res, next) => {
  const { valid, errors } = validateUserData(req.body);
  if (!valid) {
    res.send({
      message: "Invalid inputs",
      errors,
    });
  } else {
    const { first_name, last_name, student_number, email } = req.body;
    const query = `Insert into student_details(first_name, last_name, student_number,email) values ("${first_name}", "${last_name}", "${student_number}", "${email}")`;
    db.query(query, (error, result) => {
      if (error) {
        res.send({
          message: "Error",
          error,
        });
      } else {
        res.send({
          message: "Student added successfully",
          result,
        });
      }
    });
  }
};
