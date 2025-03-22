// lib/db.js
import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: 'yamabiko.proxy.rlwy.net',
    port: 34022,
    database: 'railway',
    user: 'root',
    password: 'VidJtpIjmldrgYYMaouvLxvseKcAxsmA',
  },
});

export default async function executeQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

// pages/api/create-table.js
import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const query = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  )`;
  const result = await executeQuery({ query });
  res.status(200).json(result);
}

// pages/api/insert-data.js
import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  const values = [name, email];
  const result = await executeQuery({ query, values });
  res.status(201).json(result);
}

// pages/api/fetch-data.js
import executeQuery from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const query = 'SELECT * FROM users';
  const result = await executeQuery({ query });
  res.status(200).json(result);
}