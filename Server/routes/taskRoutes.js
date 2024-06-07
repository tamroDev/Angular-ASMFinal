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
  const sql = `SELECT * FROM tasks`;
  db.query(sql, (err, data) => {
    if (err) res.json({ message: "Lỗi khi lấy dữ liệu công việc", error: err.message });
    else res.json(data);
  });
});
// Tạo công việc
router.post("/", (req, res) => {
  const { name, description, assigned_to, project_id,status, priority } = req.body;

   const sql = `INSERT INTO tasks (name, description, assigned_to, project_id,status, priority) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, description, assigned_to, project_id,status, priority], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Lỗi khi tạo công việc", error: err.message });
    } else {
      res.status(200).json({ message: "Tạo công việc thành công", id: result.insertId });
    }
  });
});


// Xem công việc theo ID:
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM tasks WHERE id = ?`;
  console.log(sql);
  db.query(sql, [id], (err, data) => {
    if (err) res.json({ message: "Lỗi khi lấy dữ liệu công việc", error: err.message });
    else res.json(data[0]);
  });
});

// Cập nhật công việc
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, assigned_to, project_id,status, priority } = req.body;
  const sql = `UPDATE tasks SET name = ?, description = ?, assigned_to = ?, project_id = ?, status = ?, priority = ? WHERE id = ?`;
  db.query(sql, [name, description, assigned_to, project_id, status, priority, id], (err, result) => {
    if (err) res.json({ message: "Lỗi khi cập nhật công việc", error: err.message });
    else res.json({ message: "Cập nhật công việc thành công" });
  });
});

// Xóa công việc
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Lỗi khi xóa công việc", error: err.message });
    else res.json({ message: "Xóa công việc thành công" });
  });
});


module.exports = router;
