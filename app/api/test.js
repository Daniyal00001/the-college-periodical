import connection from "@/lib/db";

export default async function handler(req, res) {
  try {
    const [rows] = await connection.query("SELECT NOW() AS time");
    res.status(200).json({ time: rows[0].time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
