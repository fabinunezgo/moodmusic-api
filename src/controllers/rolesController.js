import pool from "../config/db.js";

export const getRoles = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM roles");
  res.json(rows);
};

export const createRole = async (req, res) => {
  const { nombre } = req.body;
  const [result] = await pool.query(
    "INSERT INTO roles (nombre) VALUES (?)",
    [nombre]
  );
  res.json({ id: result.insertId, nombre });
};
