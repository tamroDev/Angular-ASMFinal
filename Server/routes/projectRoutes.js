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
  const sql = `SELECT * FROM projects`;
  db.query(sql, (err, data) => {
    if (err) res.json({ message: "Lỗi khi lấy dữ liệu nhân viên", error: err.message });
    else res.json(data);
  });
});


// Fetch All Employees
router.get("/project_team", (req, res) => {
  const sql = `SELECT * FROM project_team`;
  db.query(sql, (err, data) => {
    if (err) res.json({ message: "Lỗi khi lấy dữ liệu nhân viên", error: err.message });
    else res.json(data);
  });
});
//  Lấy các thành viên của team
router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  console.log(projectId);
  const sql = `
  SELECT 
  projects.id AS id,
  projects.name AS name,
  projects.date_created AS date_created,
  projects.budget AS budget,
  CONCAT(users.first_name, ' ', users.last_name) AS leader,
  GROUP_CONCAT(CONCAT(users.first_name, ' ', users.last_name) SEPARATOR ', ') AS team
FROM 
  project_team
INNER JOIN 
  users ON project_team.user_id = users.id
INNER JOIN 
  roles ON users.role_id = roles.id
INNER JOIN
  projects ON project_team.project_id = projects.id
WHERE  
  project_team.project_id = ?
GROUP BY
  projects.id;

  `;

  db.query(sql, [projectId], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách thành viên", error: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});


// Tạo dự án
router.post("/", (req, res) => {
  const { name, date_created, budget, leader_id, team } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi bắt đầu giao dịch", error: err.message });
    }

    const sqlInsertProject = `INSERT INTO projects (name, date_created, budget, leader_id) VALUES (?, ?, ?, ?)`;
    db.query(sqlInsertProject, [name, date_created, budget, leader_id], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ message: "Lỗi khi tạo dự án", error: err.message });
        });
      }

      const projectId = result.insertId;
      const sqlInsertTeam = `INSERT INTO project_team (project_id, user_id) VALUES ?`;
      const teamData = team.map((userId) => [projectId, userId]);

      db.query(sqlInsertTeam, [teamData], (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ message: "Lỗi khi thêm thành viên vào nhóm dự án", error: err.message });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ message: "Lỗi khi commit giao dịch", error: err.message });
            });
          }

          res.status(200).json({ message: "Tạo dự án và thêm thành viên vào nhóm thành công", id: projectId });
        });
      });
    });
  });
});



// Xem nhân viên theo ID:
// router.get("/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `SELECT * FROM projects WHERE id = ?`;
//   console.log(sql);
//   db.query(sql, [id], (err, data) => {
//     if (err) res.json({ message: "Lỗi khi lấy dữ liệu nhân viên", error: err.message });
//     else res.json(data[0]);
//   });
// });
// Cập nhật dự án và thêm thành viên nhóm mới
router.put("/:id", (req, res) => {
  const projectId = req.params.id;
  const { name, date_created, budget, leader_id, team } = req.body;

  // Bắt đầu giao dịch
  db.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ message: "Lỗi khi bắt đầu giao dịch", error: err.message });
    }

    const updateProjectSQL = `UPDATE projects SET name = ?, date_created = ?, budget = ?, leader_id = ? WHERE id = ?`;
    db.query(updateProjectSQL, [name, date_created, budget, leader_id, projectId], (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ message: "Lỗi khi cập nhật dự án", error: err.message });
        });
      }

      // Thêm các thành viên nhóm mới
      if (team && team.length > 0) {
        const insertTeamSQL = `INSERT INTO project_team (project_id, user_id) VALUES ?`;
        const teamValues = team.map(userId => [projectId, userId]);

        db.query(insertTeamSQL, [teamValues], (err, result) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ message: "Lỗi khi thêm thành viên nhóm mới", error: err.message });
            });
          }

          // Hoàn tất giao dịch
          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ message: "Lỗi khi hoàn tất giao dịch", error: err.message });
              });
            }

            res.status(200).json({ message: "Cập nhật dự án và thêm thành viên nhóm thành công" });
          });
        });
      } else {
        // Hoàn tất giao dịch khi không có thành viên nhóm mới
        db.commit(err => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ message: "Lỗi khi hoàn tất giao dịch", error: err.message });
            });
          }

          res.status(200).json({ message: "Cập nhật dự án thành công" });
        });
      }
    });
  });
});




// Xóa dự án
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM projects WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Lỗi khi xóa nhân viên", error: err.message });
    else res.json({ message: "Xóa nhân viên thành công" });
  });
});


module.exports = router;
