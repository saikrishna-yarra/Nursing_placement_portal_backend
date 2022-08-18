const { json } = require("express");

class Router {
  constructor(app, db) {
    this.login(app, db);
    this.logout(app, db);
    this.isLoggedIn(app, db);
  }
  login(app, db) {
    app.post("/login", (req, res) => {
      let username = req.body.username;
      let password = req.body.password;
      username = username.toLowerCase();
      password = password.toLowerCase();
      if (username.length > 12 || password.length > 12) {
        res.json({
          success: false,
          msg: "An Error Occured, Please Try Again",
        });
        return;
      }
      let cols = [username];
      db.query(
        "SELECT * FROM user WHERE Username=? LIMIT 1",
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
            if (password === data[0].Password) {
              res.json({
                success: true,
                username: data[0].username,
              });
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
  }

  logout(app, db) {
    app.post("/logout", (req, res) => {
      if (req.session.userID) {
        req.session.destroy();
        res.json({
          success: true,
        });
        return true;
      } else {
        res.json({
          success: false,
        });
        return false;
      }
    });
  }

  isLoggedIn(app, db) {
    app.post("/isLoggedIn", (req, res) => {
      if (req.session.userID) {
        let cols = [req.session.userID];
        db.query(
          "SELECT * FROM user WHERE Id=? LIMIT 1",
          cols,
          (err, data, fields) => {
            if (data && data.length === 1) {
              res.json({
                success: true,
                username: data[0].username,
              });
              return true;
            } else {
              res.json({
                success: false,
              });
              return false;
            }
          }
        );
      } else {
        res.json({
          success: false,
        });
      }
    });
  }
}

module.exports = Router;
