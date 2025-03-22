import pool from '../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });

  try {
    await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}