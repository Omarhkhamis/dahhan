import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  charset: "utf8mb4",
  timezone: "Z"
});

export async function query<T = any>(sql: string, params: any[] = []) {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}

export async function execute(sql: string, params: any[] = []) {
  const [result] = await pool.execute(sql, params);
  return result as any;
}

export default pool;
