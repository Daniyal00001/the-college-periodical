import connection from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await connection.query("SELECT NOW() AS time");
    return Response.json({ success: true, time: rows[0].time });
  } catch (error) {
    console.error("Database error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}


// mysql -h thecollegeperiodicall-thecollegeperiodical.j.aivencloud.com  -P 3306   -u avnadmin  -p  --ssl-ca=certs/ca.pem defaultdb < dump.sql
