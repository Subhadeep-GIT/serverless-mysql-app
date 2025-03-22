import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: "yamabiko.proxy.rlwy.net",
        user: "root",
        password: "VidJtpIjmldrgYYMaouvLxvseKcAxsmA",
        database: "railway",
        port: 34022
    });

    try {
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(255),
                message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        res.status(200).json({ message: "Table created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await connection.end();
    }
}