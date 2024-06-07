var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var db = mysql.createConnection({
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

// Fetch All Employees
router.get("/", (req, res) => {
  const sql = `SELECT * FROM users`;
  db.query(sql, (err, data) => {
    if (err)
      res.json({
        message: "Lỗi khi lấy dữ liệu nhân viên",
        error: err.message,
      });
    else res.json(data);
  });
});

// Tạo nhân viên:
router.post("/", (req, res) => {
  const { first_name, last_name, email, address, phone } = req.body;
  console.log(req.body);

  const sql = `INSERT INTO users (first_name, last_name, email, address, phone) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [first_name, last_name, email, address, phone],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Lỗi khi tạo nhân viên", error: err.message });
        console.log(err);
      } else {
        res
          .status(200)
          .json({ message: "Tạo nhân viên thành công", id: result.insertId });
      }
    }
  );
});

// Xem nhân viên theo ID:
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM users WHERE id = ?`;
  console.log(sql);
  db.query(sql, [id], (err, data) => {
    if (err)
      res.json({
        message: "Lỗi khi lấy dữ liệu nhân viên",
        error: err.message,
      });
    else res.json(data[0]);
  });
});

// Cập nhật nhân viên:
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, address, phone } = req.body;
  console.log(req.body);
  const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, address = ?, phone = ? WHERE id = ?`;
  db.query(
    sql,
    [first_name, last_name, email, address, phone, id],
    (err, result) => {
      console.log(result);
      if (err)
        res.json({ message: "Lỗi khi cập nhật nhân viên", error: err.message });
      else res.json({ message: "Cập nhật nhân viên thành công" });
    }
  );
});

// Xóa nhân viên:
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM users WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Lỗi khi xóa nhân viên", error: err.message });
    else res.json({ message: "Xóa nhân viên thành công" });
  });
});

module.exports = router;
