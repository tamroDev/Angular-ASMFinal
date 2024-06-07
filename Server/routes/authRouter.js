const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const md5 = require("md5");
const mysql = require("mysql");
const session = require("express-session");
const path = require("path");

const PRIVATE_KEY = fs.readFileSync("private-key.txt");
const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "static")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fw1-angular",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connect success");
  }
});
// Login
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = md5(req.body.password);
  if (email && password) {
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          const userInfo = results[0];
          const jwtBearerToken = jwt.sign(
            {
              id: userInfo.id,
              email: userInfo.email,
              role_id: userInfo.role_id, // Trả về vai trò của người dùng
              name: `${userInfo.first_name + " " + userInfo.last_name}`,
            },
            PRIVATE_KEY,
            {
              algorithm: "RS256",
              expiresIn: 120,
              subject: String(userInfo.first_name),
            }
          );
          res.status(200).json({
            idToken: jwtBearerToken,
            expiresIn: 120,
            role_id: userInfo.role_id,
            user_id: userInfo.id,
            name: `${userInfo.first_name + " " + userInfo.last_name}`, // Trả về tên của người dùng
          });
        } else {
          res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
        }
        res.end();
      }
    );
  } else {
    res.status(400).json({ message: "Vui lòng nhập Email và mật khẩu!" });
  }
});

// Signup
router.post("/signup", (req, res) => {
  let email = req.body.email;
  let password = md5(req.body.password);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  if (email && password && firstName && lastName) {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.status(400).json({ message: "Email đã tồn tại!" });
          res.end();
        } else {
          db.query(
            "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
            [email, password, firstName, lastName],
            function (error, results, fields) {
              if (error) throw error;
              res.status(201).json({ message: "Đăng ký thành công!" });
              res.end();
            }
          );
        }
      }
    );
  } else {
    res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    res.end();
  }
});

module.exports = router;
