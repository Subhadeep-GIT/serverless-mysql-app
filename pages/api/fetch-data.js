import pool from '../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const [users] = await pool.query('SELECT * FROM users');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}